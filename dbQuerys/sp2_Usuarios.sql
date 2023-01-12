CREATE PROCEDURE Seguridad.spSeg_Usuario_GetUsersDetails
AS
BEGIN
    -- SET NOCOUNT ON impide que aparezca el mensaje: (# rows affected), mejorando el rendimiento del query
    SET NOCOUNT ON;

    --Forma de calcular la edad encontrada en https://stackoverflow.com/questions/1572110/how-to-calculate-age-in-years-based-on-date-of-birth-and-getdate. Respuesta de @dotjoe
    declare @as_of datetime
    select @as_of = GETDATE()

    SELECT CONCAT(nombre1,' ',nombre2,' ',apellido1,' ',apellido2,' ') AS  nombre_completo,
        (SELECT Detalle
        FROM SIPE_Negocio_Test.Catalogo.Cat_Tabla_Cabecera CatCab JOIN SIPE_Negocio_Test.Catalogo.Cat_Catalogo_Detalle CatDet
            ON CatCab.IdTabla = CatDet.IdTabla
        WHERE CatCab.TablaNombre = 'tbl_TipoIdentificacion'
            AND CatDet.IdCodigo = tipo_ident) AS tipo_identificacion,
        fecha_nacimiento
	(0 + Convert(Char(8),@as_of,112) - Convert(Char(8),fecha_nacimiento,112)) / 10000 AS edad,
        (SELECT Detalle
        FROM SIPE_Negocio_Test.Catalogo.Cat_Tabla_Cabecera CatCab JOIN SIPE_Negocio_Test.Catalogo.Cat_Catalogo_Detalle CatDet
            ON CatCab.IdTabla = CatDet.IdTabla
        WHERE CatCab.TablaNombre = 'tbl_EstadoCivil'
            AND CatDet.IdCodigo = estado_civil) AS estado_civil,
        fecha_registro,
        (SELECT CONCAT(nombre1,' ',nombre2,' ',apellido1,' ',apellido2,' ') AS  nombre_completo
        FROM SIPE_Negocio_Test.Seguridad.Seg_Usuario SegUserInt
        WHERE SegUserInt.id_user = SegUserExt.id_jefe) AS nombre_jefe,
        (SELECT Descripcion2Rol
        FROM SIPE_Negocio_Test.Seguridad.Seg_Rol SegRol
        WHERE  SegRol.idRol = SegUserExt.id_perfil) AS rol
    FROM SIPE_Negocio_Test.Seguridad.Seg_Usuario SegUserExt

END
