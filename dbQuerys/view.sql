
CREATE VIEW DetalleVentas
AS
	SELECT vd.id_venta_cabecera,
		vd.id_producto_servicio,
		(SELECT Detalle
		FROM SIPE_Negocio_Test.Distribuidor.Dis_Distribuidor_Detalle
		WHERE idCodigo = vd.id_producto_servicio)  AS serv_detalle,
		vd.tarifa_basica,
		vd.cantidad,
		vd.total,
		vd.num_portar,
		(SELECT Detalle
		FROM SIPE_Negocio_Test.Catalogo.Cat_Tabla_Cabecera CatCab JOIN SIPE_Negocio_Test.Catalogo.Cat_Catalogo_Detalle CatDet
			ON CatCab.IdTabla = CatDet.IdTabla
		WHERE CatCab.TablaNombre = 'tbl_OperadorMovil'
			AND CatDet.IdCodigo = vd.num_portar_operadora) AS operadora_donante,
		(SELECT Detalle
		FROM SIPE_Negocio_Test.Catalogo.Cat_Tabla_Cabecera CatCab JOIN SIPE_Negocio_Test.Catalogo.Cat_Catalogo_Detalle CatDet
			ON CatCab.IdTabla = CatDet.IdTabla
		WHERE CatCab.TablaNombre = 'tbl_DistribuidorServicio'
			AND CatDet.IdCodigo = vc.id_distribuidor_servicio) AS distribuidor,
		vd.fecha_ingreso AS fecha_ingreso_venta,
		(SELECT CONCAT(nombre1,' ',nombre2,' ',apellido1,' ',apellido2,' ') AS  nombre_completo
		FROM SIPE_Negocio_Test.Seguridad.Seg_Usuario
		WHERE id_user = vd.id_user_ingreso)  AS nombre_asesor,
		(SELECT Detalle
		FROM SIPE_Negocio_Test.Catalogo.Cat_Tabla_Cabecera CatCab JOIN SIPE_Negocio_Test.Catalogo.Cat_Catalogo_Detalle CatDet
			ON CatCab.IdTabla = CatDet.IdTabla
		WHERE CatCab.TablaNombre = 'tbl_EstadoVenta'
			AND CatDet.IdCodigo = vc.id_estado)  AS estado_venta,
		(SELECT Detalle
		FROM SIPE_Negocio_Test.Catalogo.Cat_Tabla_Cabecera CatCab JOIN SIPE_Negocio_Test.Catalogo.Cat_Catalogo_Detalle CatDet
			ON CatCab.IdTabla = CatDet.IdTabla
		WHERE CatCab.TablaNombre = 'tbl_SubEstadoVenta'
			AND CatDet.IdCodigo = vc.id_subestado)  AS subestado_venta,
		vc.fecha_operativa,
		(SELECT Detalle
		FROM SIPE_Negocio_Test.Catalogo.Cat_Tabla_Cabecera CatCab JOIN SIPE_Negocio_Test.Catalogo.Cat_Catalogo_Detalle CatDet
			ON CatCab.IdTabla = CatDet.IdTabla
		WHERE CatCab.TablaNombre = 'tbl_DiaPago'
			AND CatDet.IdCodigo = vc.dia_pago) AS ciclo_pago,
		vc.num_solicitud
	FROM Venta.Venta_Detalle AS vd INNER JOIN
		Venta.Venta_Cabecera AS vc ON vd.id_venta_cabecera = vc.id_venta_cabecera