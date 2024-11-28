# View: vw_RepuestosV2_Bolsas_Vendedores_2

## Usa los objetos:
- [[vw_RepuestosV2_VendedoresBoutiques_Liquidacion]]
- [[vw_RepuestosV2_VendedoresDeTienda_Liquidacion]]
- [[vw_RepuestosV2_VendedoresMostradorEItinerantes_Liquidacion]]
- [[vw_RepuestosV2_VendedoresYJefes_Liquidacion]]

```sql



CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Vendedores_2] AS

select *
from (
SELECT Ano_Periodo, Mes_Periodo, SUM(ValorBaseComision) AS ValorBaseTotal, CodigoCentro, NombreCentro, 
--cod_marca=min(cod_marca), 
--nombre_marca=min(nombre_marca) 
cod_marca=case when min(cod_marca) = 411 then 410 else min(cod_marca) end, 
nombre_marca= case when min(nombre_marca) like '%CONSTRUCCI%' then 'JOHN DEERE AGRÍCOLA                     ' else  min(nombre_marca) end 

FROM (

-- MAESTRAS DE VENDEDORES DE REPUESTOS - SUBCRITERIOS: 104 Y 110 (NO TENER EN CUENTA JEFES)
SELECT        Ano_Periodo, Mes_Periodo, ValorBaseComision, CodigoCentro, NombreCentro, cod_marca, nombre_marca
FROM            vw_RepuestosV2_VendedoresYJefes_Liquidacion
WHERE	(IdRangoMaestra IN (278, 283, 302, 346, 367, 467, 468))


UNION ALL

-- MAESTRAS DE VENDEDORES DE BOUTIQUE - SUBCRITERIOS: 105 Y 111
SELECT        Ano_Periodo, Mes_Periodo, ValorBaseComision, CodigoCentro, NombreCentro, cod_marca, nombre_marca
FROM            vw_RepuestosV2_VendedoresBoutiques_Liquidacion
WHERE	(IdRangoMaestra IN (280, 285, 397, 398))


UNION ALL

-- MAESTRAS DE VENDEDORES DE MOSTRADOR - SUBCRITERIOS: 106 Y 112 (NO TENER EN CUENTA ITINERANTES)
SELECT        Ano_Periodo, Mes_Periodo, ValorBaseComision, CodigoCentro, NombreCentro, cod_marca, nombre_marca
FROM            vw_RepuestosV2_VendedoresMostradorEItinerantes_Liquidacion
-- JCS: 2023/12/07 - AHORA SE EXCLUYE LA MAESTRA 471 (VENDEDOR CUENTA CLAVE MAQUINARIA) PQ NO APLICA
--WHERE	(IdRangoMaestra IN (281, 286, 345, 362, 363, 396, 471))
WHERE	(IdRangoMaestra IN (281, 286, 345, 362, 363, 396))

UNION ALL

-- MAESTRAS DE VENDEDORES DE TIENDA - SUBCRITERIO: 158 (NO TENER EN CUENTA ITINERANTES)
-- 2023/09/27 - JCS: SE AGREGA 420 -> VENDEDORES DE TIENDA
SELECT        Ano_Periodo, Mes_Periodo, ValorBaseComision, CodigoCentro, NombreCentro, cod_marca, nombre_marca
FROM            vw_RepuestosV2_VendedoresDeTienda_Liquidacion
WHERE	(IdRangoMaestra IN (420))


) AS VENTA_PERSONAL
GROUP BY  Ano_Periodo, Mes_Periodo, CodigoCentro, NombreCentro
)  a
--where Ano_Periodo = 2023
--and Mes_Periodo = 10
--and CodigoCentro in (25,44)

```
