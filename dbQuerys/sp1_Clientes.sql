CREATE PROCEDURE Cliente.spCli_Clientes_GetClientByDNI
    @dni varchar(25)
AS
BEGIN
    -- SET NOCOUNT ON impide que aparezca el mensaje: (# rows affected), mejorando el rendimiento del query
    SET NOCOUNT ON;

    declare @as_of datetime
    select @as_of = GETDATE()

    SELECT CONCAT(nombre1,' ',nombre2,' ',apellido1,' ',apellido2,' ') AS  nombre_completo,
        (SELECT Detalle
        FROM SIPE_Negocio_Test.Catalogo.Cat_Tabla_Cabecera CatCab JOIN SIPE_Negocio_Test.Catalogo.Cat_Catalogo_Detalle CatDet
            ON CatCab.IdTabla = CatDet.IdTabla
        WHERE CatCab.TablaNombre = 'tbl_TipoIdentificacion'
            AND CatDet.IdCodigo = id_tipo_identificacion) AS tipo_identificacion,
        fecha_nacimiento,
        (0 + Convert(Char(8),@as_of,112) - Convert(Char(8),fecha_nacimiento,112)) / 10000 AS edad,
        (SELECT Detalle
        FROM SIPE_Negocio_Test.Catalogo.Cat_Tabla_Cabecera CatCab JOIN SIPE_Negocio_Test.Catalogo.Cat_Catalogo_Detalle CatDet
            ON CatCab.IdTabla = CatDet.IdTabla
        WHERE CatCab.TablaNombre = 'tbl_EstadoCivil'
            AND CatDet.IdCodigo = id_estado_civil) AS estado_civil
    FROM SIPE_Negocio_Test.Cliente.Cli_Clientes
    WHERE identificacion = @dni

END