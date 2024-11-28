# View: vw_RepuestosV2_Bolsas_Vendedores_1_4Dic2023

## Usa los objetos:
- [[vw_RepuestosV2_VendedoresBoutiques_Liquidacion]]
- [[vw_RepuestosV2_VendedoresDeTienda_Liquidacion]]
- [[vw_RepuestosV2_VendedoresMostradorEItinerantes_Liquidacion]]
- [[vw_RepuestosV2_VendedoresYJefes_Liquidacion]]

```sql
























create VIEW [dbo].[vw_RepuestosV2_Bolsas_Vendedores_1_4Dic2023]
AS

SELECT Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoEmpleado, Empleado, FechaRetiro, SUM(ValorBaseComision) AS ValorBaseComision, CodigoCentro, NombreCentro, cod_marca, nombre_marca, CodigoCargo, NombreCargo 

FROM (

-- MAESTRAS DE VENDEDORES DE REPUESTOS - SUBCRITERIOS: 104 Y 110 (NO TENER EN CUENTA JEFES)
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoEmpleado, Empleado, FechaRetiro, ValorBaseComision, CodigoCentro, NombreCentro, cod_marca, nombre_marca, CodigoCargo, NombreCargo
FROM            vw_RepuestosV2_VendedoresYJefes_Liquidacion
WHERE	 (IdRangoMaestra IN (278, 283, 302, 346, 367, 467, 468))


UNION ALL

-- MAESTRAS DE VENDEDORES DE BOUTIQUE - SUBCRITERIOS: 105 Y 111
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoEmpleado, Empleado, FechaRetiro, ValorBaseComision, CodigoCentro, NombreCentro, cod_marca, nombre_marca, CodigoCargo, NombreCargo
FROM            vw_RepuestosV2_VendedoresBoutiques_Liquidacion
WHERE	(IdRangoMaestra IN (280, 285, 397, 398))


UNION ALL

-- MAESTRAS DE VENDEDORES DE MOSTRADOR - SUBCRITERIOS: 106 Y 112 (NO TENER EN CUENTA ITINERANTES)
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoEmpleado, Empleado, FechaRetiro, ValorBaseComision, CodigoCentro, NombreCentro, cod_marca, nombre_marca, CodigoCargo, NombreCargo
FROM            vw_RepuestosV2_VendedoresMostradorEItinerantes_Liquidacion
WHERE	(IdRangoMaestra IN (281, 286, 345, 362, 363, 396, 471))

UNION ALL

-- MAESTRAS DE VENDEDORES DE TIENDA - SUBCRITERIO: 158 (NO TENER EN CUENTA ITINERANTES)
-- 2023/09/27 - JCS: SE AGREGA 420 -> VENDEDORES DE TIENDA
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoEmpleado, Empleado, FechaRetiro, ValorBaseComision, CodigoCentro, NombreCentro, cod_marca, nombre_marca, CodigoCargo, NombreCargo
FROM            vw_RepuestosV2_VendedoresDeTienda_Liquidacion
WHERE	(IdRangoMaestra IN (420))



) AS VENTA_PERSONAL

GROUP BY  Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoEmpleado, Empleado, FechaRetiro, CodigoCentro, NombreCentro, cod_marca, nombre_marca, CodigoCargo, NombreCargo


```
