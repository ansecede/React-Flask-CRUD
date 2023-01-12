from db_connection import DB_CONNECTION
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select
from sqlalchemy.orm import declarative_base
from flask_cors import CORS
from decimal import Decimal

# Configure application
app = Flask(__name__)


# Permite que aplicaciones externas puedan llamar a la API
CORS(app)

# Conexión a la base de datos
app.config["SQLALCHEMY_DATABASE_URI"] = DB_CONNECTION
app.config["SQLALCHEMY_ECHO"] = False
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

Base = declarative_base()


class Catalogos_Cab(Base):
    __table__ = db.Table("Cat_Tabla_Cabecera", db.metadata,
                         autoload=True, autoload_with=db.engine, schema="Catalogo")

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Catalogos_Det(Base):
    __table__ = db.Table("Cat_Catalogo_Detalle", db.metadata,
                         autoload=True, autoload_with=db.engine, schema="Catalogo")

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Clientes(Base):
    __table__ = db.Table("Cli_Clientes", db.metadata,
                         autoload=True, autoload_with=db.engine, schema="Cliente")

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


@app.route("/")
def index():
    return "<h1 style='font-weight:600; text-align:center;'>M2G TEST API<h1>"


@app.route("/catalogs", methods=["GET"])
def get_catalogs():
    """Obtiene todas las filas de Cat_Tabla_Cabecera en formato JSON"""
    result = db.session.execute(
        "SELECT * FROM [SIPE_Negocio_Test].[Catalogo].[Cat_Tabla_Cabecera] FOR JSON AUTO").fetchall()
    result_json = ""

    for row in result:
        result_json += row[0]

    return result_json


@app.route("/catalogs", methods=["POST"])
def create_catalog():
    """Crea una nueva cabecera de Catalogo"""
    id = request.json.get("IdTabla")
    t_nombre = request.json.get("TablaNombre")
    estado = request.json.get("Estado")
    descripcion = request.json.get("Descripcion")
    new_catalog = Catalogos_Cab(IdTabla=id, TablaNombre=t_nombre,
                                Estado=estado, Descripcion=descripcion)
    db.session.add(new_catalog)
    db.session.commit()

    res_msg = "Catalog type created successfully"
    return {"msg": res_msg}


@app.route("/catalogs/<int:catalog_id>", methods=["POST"])
def delete_catalog(catalog_id):
    """Elimina logicamente la cabecera de los catalogos (Cambia estado de A a I)"""
    catalog = db.session.query(Catalogos_Cab).filter(
        Catalogos_Cab.IdTabla == catalog_id).first()
    if not catalog:
        return "ID not found"
    estado = request.json.get("Estado")
    if estado:
        catalog.Estado = estado

    db.session.commit()

    res_msg = "Catalog type deleted successfully    "
    return jsonify({"msg": res_msg})


@app.route("/catalogs/<int:catalog_cab_id>/edit", methods=["GET"])
def get_catalogs_details(catalog_cab_id):
    """Metodo get para el siguiente requerimiento: Al momento de Editar un elemento se abrirá una nueva pestaña donde podremos agregar los catálogos respectivos a cada tipo de catálogo. Con este metodo consigo la información del tipo de Catalogo (cabecera) y sus catalogos respectivos (detalle)"""
    catalog_cab = db.session.execute(select(Catalogos_Cab).where(
        Catalogos_Cab.IdTabla == catalog_cab_id)).first()
    catalog_det = db.session.execute(select(Catalogos_Det).where(
        Catalogos_Det.IdTabla == catalog_cab_id)).all()

    if not catalog_cab:
        return "ID not found"
    result_json_cab = catalog_cab[0].as_dict()
    result_json_det = []

    # Hay una columna (DescAlternoDec) que es de tipo Decimal, y eso no es "JSON serializable", entonces lo convierto en int para poderlo enviar a quien haga la petición
    for idx, row in enumerate(catalog_det):
        result_json_det.append(row[0].as_dict())
        problematic_number = result_json_det[idx].get("DescAlternoDec")
        if type(problematic_number) == Decimal:
            result_json_det[idx]["DescAlternoDec"] = int(problematic_number)

    return {"Catalogos_Cab": result_json_cab, "Catalogos_Det": result_json_det}


@app.route("/catalogs/<int:catalog_cab_id>/edit", methods=["POST"])
def create_catalog_detail(catalog_cab_id):
    """Crear un catalogo para un tipo de catalogo con id:catalog_cab_id, con todos los capos requeridos"""
    id_tabla = catalog_cab_id
    id_codigo = request.json.get("IdCodigo")
    estado = request.json.get("Estado")
    detalle = request.json.get("Detalle")
    new_catalog = Catalogos_Det(IdTabla=id_tabla, IdCodigo=id_codigo,
                                Estado=estado, Detalle=detalle)
    db.session.add(new_catalog)
    db.session.commit()

    res_msg = "Catalog successfully created"
    return jsonify({"msg": res_msg})


@app.route("/catalogs/<int:catalog_cab_id>/edit/<catalog_det_id>", methods=["PUT"])
def update_catalog_detail(catalog_cab_id, catalog_det_id):
    """Editar un un catalogo para un tipo de catalogo con id:catalog_cab_id, con los campos disponibles. No permití que cambien los IDs porque tambien cambiría a que Catalogo pertenecen. En tal caso mejor crear uno nuevo y borrar el viejo"""
    if not catalog_cab_id:
        return "ID cat_type not found"
    if not catalog_det_id:
        return "ID cat_det not found"
    catalog_det = db.session.execute(select(Catalogos_Det).where(
        Catalogos_Det.IdTabla == catalog_cab_id).where(Catalogos_Det.IdCodigo == catalog_det_id)).first()

    estado = request.json.get("Estado")
    if estado:
        catalog_det[0].Estado = estado
    detalle = request.json.get("Detalle")
    if detalle:
        catalog_det[0].Detalle = detalle

    db.session.commit()

    res_msg = "Catalog updated successfully "
    return jsonify({"msg": res_msg})


@app.route("/catalogs/<int:catalog_cab_id>/edit/<catalog_det_id>", methods=["POST"])
def delete_catalog_detail(catalog_cab_id, catalog_det_id):
    """Elimina logicamente los catalogos (Cambia estado de A a I)"""
    if not catalog_cab_id:
        return "ID cat_type not found"
    if not catalog_det_id:
        return "ID cat_det not found"
    catalog_det = db.session.execute(select(Catalogos_Det).where(
        Catalogos_Det.IdTabla == catalog_cab_id).where(Catalogos_Det.IdCodigo == catalog_det_id)).first()

    estado = request.json.get("Estado")
    if estado:
        catalog_det[0].Estado = estado

    db.session.commit()

    res_msg = "Catalog deleted successfully "
    return jsonify({"msg": res_msg})


@app.route("/clients", methods=["GET"])
def get_clients():
    # result = db.session.execute(
    #     "SELECT [id_cliente],[id_tipo_identificacion],[identificacion],[nombre1],[nombre2],[apellido1],[apellido2] FROM [SIPE_Negocio_Test].[Cliente].[Cli_Clientes] FOR JSON AUTO").fetchall()
    result = db.session.execute(select(Clientes.id_cliente, Clientes.id_tipo_identificacion, Clientes.identificacion,
                                Clientes.nombre1, Clientes.nombre2, Clientes.apellido1, Clientes.apellido2, Catalogos_Det.Detalle).join(Catalogos_Det, Catalogos_Det.IdCodigo == Clientes.id_tipo_identificacion).where(Catalogos_Det.IdTabla == 2)).all()

    clientes = []
    for row in result[:10]:
        client = dict(row)
        # Mismo problema que en get_catalogs_details. id_user es de tipo Decimal.
        problematic_number = client.get("id_cliente")
        client["id_cliente"] = int(problematic_number)
        clientes.append(client)

    # Tomamos algunos datos utiles de la tabla Catalogos_Det, que serviran a la hora de crear y actualizar Clientes
    result_dni = db.session.execute(select(Catalogos_Det.Detalle).where(
        Catalogos_Det.IdTabla == 2)).all()
    tipo_identificacion = [x[0] for x in result_dni]

    result_sexo = db.session.execute(select(Catalogos_Det.Detalle).where(
        Catalogos_Det.IdTabla == 4)).all()
    sexo = [x[0] for x in result_sexo]

    result_estado_civil = db.session.execute(select(Catalogos_Det.Detalle).where(
        Catalogos_Det.IdTabla == 3)).all()
    estado_civil = [x[0] for x in result_estado_civil]

    result_nacionalidad = db.session.execute(select(Catalogos_Det.Detalle).where(
        Catalogos_Det.IdTabla == 13)).all()
    nacionalidad = [x[0] for x in result_nacionalidad]

    result_provincias = db.session.execute(select(Catalogos_Det.Detalle).where(
        Catalogos_Det.IdTabla == 6)).all()
    provincias = [x[0] for x in result_provincias]

    result_ciudad = db.session.execute(select(Catalogos_Det.Detalle).where(
        Catalogos_Det.IdTabla == 7)).all()
    ciudad = [x[0] for x in result_ciudad]

    result_forma_pago = db.session.execute(select(Catalogos_Det.Detalle).where(
        Catalogos_Det.IdTabla == 5)).all()
    forma_pago = [x[0] for x in result_forma_pago]

    return {"clientes": clientes, "tipoIdentificacion": tipo_identificacion, "sexo": sexo, "estadoCivil": estado_civil, "nacionalidad": nacionalidad, "provincias": provincias, "ciudad": ciudad, "formaPago": forma_pago}


@app.route("/clients", methods=["POST"])
def create_client():
    """Crea un nuevo cliente"""
    nombre1 = request.json.get("nombre1")
    nombre2 = request.json.get("nombre2")
    apellido1 = request.json.get("apellido1")
    apellido2 = request.json.get("apellido2")
    tipo_identificacion = request.json.get("tipoIdentificacion")
    identificacion = request.json.get("identificacion")
    fecha_nacimiento = request.json.get("fechaNacimiento")
    edad = request.json.get("edad")
    sexo = request.json.get("sexo")
    estado_civil = request.json.get("estadoCivil")
    nacionalidad = request.json.get("nacionalidad")
    email = request.json.get("email")
    celular = request.json.get("celular")
    convencional = request.json.get("convencional")
    provincia = request.json.get("provincia")
    ciudad = request.json.get("ciudad")
    ciudadela = request.json.get("ciudadela")
    calle_principal = request.json.get("callePrincipal")
    calle_secundaria = request.json.get("calleSecundaria")
    manzana = request.json.get("manzana")
    villa = request.json.get("villa")
    referencia = request.json.get("referencia")
    forma_pago = request.json.get("formaPago")
    estado = request.json.get("estado")

    id_tipo_identificacion = db.session.execute(select(Catalogos_Det.IdCodigo).where(
        Catalogos_Det.Detalle == tipo_identificacion)).first()[0]
    id_estado_civil = db.session.execute(select(Catalogos_Det.IdCodigo).where(
        Catalogos_Det.Detalle == estado_civil)).first()[0]
    id_genero = db.session.execute(select(Catalogos_Det.IdCodigo).where(
        Catalogos_Det.Detalle == sexo)).first()[0]
    id_nacionalidad = db.session.execute(select(Catalogos_Det.IdCodigo).where(
        Catalogos_Det.Detalle == nacionalidad)).first()[0]
    id_provincia = db.session.execute(select(Catalogos_Det.IdCodigo).where(
        Catalogos_Det.Detalle == provincia)).first()[0]
    id_ciudad = db.session.execute(select(Catalogos_Det.IdCodigo).where(
        Catalogos_Det.Detalle == ciudad)).first()[0]
    id_tipo_pago = db.session.execute(select(Catalogos_Det.IdCodigo).where(
        Catalogos_Det.Detalle == forma_pago)).first()[0]

    # print(id_tipo_identificacion)
    # print(id_estado_civil)
    # print(id_genero)
    # print(id_nacionalidad)
    # print(id_provincia)
    # print(id_ciudad)
    # print(id_tipo_pago)

    new_cliente = Clientes(nombre1=nombre1, nombre2=nombre2, apellido1=apellido1, apellido2=apellido2,
                           id_tipo_identificacion=id_tipo_identificacion, identificacion=identificacion, fecha_nacimiento=fecha_nacimiento, id_genero=id_genero, id_estado_civil=id_estado_civil, nacionalidad=id_nacionalidad, email=email,
                           celular1=celular, convencional1=convencional, id_provincia=id_provincia, id_ciudad=id_ciudad, dir_domicilio_ciudadela=ciudadela, dir_domicilio_calle1=calle_principal, dir_domicilio_calle2=calle_secundaria, dir_domicilio_manzana=manzana, dir_domicilio_villa=villa, dir_dom_referencia=referencia, id_tipo_pago=id_tipo_pago, estado=estado, activo=1)

    db.session.add(new_cliente)
    db.session.commit()

    res_msg = "Client successfully created"
    return jsonify({"msg": res_msg})


if __name__ == "__main__":
    app.run(debug=True)
