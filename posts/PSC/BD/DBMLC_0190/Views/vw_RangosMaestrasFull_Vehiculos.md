# View: vw_RangosMaestrasFull_Vehiculos

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[RangosDetalles]]
- [[RangosMaestras]]
- [[RangosVersiones]]
- [[VehiculosMarcasGrupos]]

```sql








CREATE VIEW [dbo].[vw_RangosMaestrasFull_Vehiculos]
AS


SELECT 

FACTOR.IdRangoMaestra, 
FACTOR.IdRangoVersion,
FACTOR.IdRangoMaestraAux,
PORCENTAJE.IdRangoVersionAux,

FACTOR.IdComisionModeloSub, 
FACTOR.IdComisionModeloSubCriterio, 
PORCENTAJE.IdComisionModeloSubCriterioAux,
FACTOR.IdComisionModelo,
FACTOR.CodigoMarcaGrupo,
FACTOR.MarcaGrupo,

FACTOR.NombreMaestra,
FACTOR.UnidadDeMedidaEscala, 
FACTOR.UnidadDeMedidaValor,
PORCENTAJE.NombreMaestraAux,
PORCENTAJE.UnidadDeMedidaEscalaAux, 
PORCENTAJE.UnidadDeMedidaValorAux,

FACTOR.CodigoEmpresa, 
FACTOR.CodigoConcepto,
FACTOR.CodigoConceptoAux,

FACTOR.ConsecutivoVersion,
FACTOR.IdRangoDetalle, 
Desde_Precio, 
Hasta_Precio, 
Promedio_Precio,
Valor_FactorAjuste, 
Promedio_PrecioConAjuste,

PORCENTAJE.ConsecutivoVersionAux, 
PORCENTAJE.IdRangoDetalleAux, 
PORCENTAJE.Desde AS Desde_Unidades, 
PORCENTAJE.Hasta AS Hasta_Unidades, 
PORCENTAJE.Valor AS Valor_PorcentajeComision,

((FACTOR.Desde_Precio + FACTOR.Hasta_Precio) / 2 * FACTOR.Valor_FactorAjuste) * (PORCENTAJE.Valor / 100) AS ComisionPorUnidad

FROM (

SELECT        

FACTOR.IdRangoMaestra, 
FACTOR.IdComisionModeloSub, 
FACTOR.IdComisionModeloSubCriterio, 
FACTOR.IdComisionModelo,
FACTOR.CodigoMarcaGrupo,
FACTOR.MarcaGrupo,
FACTOR.NombreMaestra,
FACTOR.UnidadDeMedidaEscala, 
FACTOR.UnidadDeMedidaValor, 
FACTOR.CodigoEmpresa,
FACTOR.IdRangoVersion, 
FACTOR.ConsecutivoVersion,
FACTOR.CodigoConcepto,
FACTOR.CodigoConceptoAux,
FACTOR.IdRangoMaestraAux,
FACTOR.IdRangoDetalle, 
FACTOR.Desde AS Desde_Precio, 
FACTOR.Hasta AS Hasta_Precio, 
(FACTOR.Desde + FACTOR.Hasta) / 2 AS Promedio_Precio,
FACTOR.Valor AS Valor_FactorAjuste, 
(FACTOR.Desde + FACTOR.Hasta) / 2 * FACTOR.Valor AS Promedio_PrecioConAjuste 


FROM            

(SELECT  
dbo.RangosMaestras.IdRangoMaestra, 
dbo.RangosMaestras.IdComisionModeloSub, 
dbo.RangosMaestras.IdComisionModeloSubCriterio, 
dbo.ComisionesModelosSub.IdComisionModelo, 
dbo.RangosMaestras.CodigoMarcaGrupo, 
dbo.VehiculosMarcasGrupos.MarcaGrupo, 
dbo.RangosMaestras.NombreMaestra, 
dbo.RangosMaestras.UnidadDeMedidaEscala, 
dbo.RangosMaestras.UnidadDeMedidaValor, 
dbo.ComisionesModelosSub.CodigoEmpresa, 
dbo.RangosVersiones.IdRangoVersion, 
dbo.RangosVersiones.ConsecutivoVersion, 
dbo.RangosDetalles.IdRangoDetalle, 
dbo.RangosDetalles.Desde, 
dbo.RangosDetalles.Hasta, 
dbo.RangosDetalles.Valor, 
dbo.RangosMaestras.CodigoConcepto, 
dbo.RangosMaestras.CodigoConceptoAux, 
dbo.RangosMaestras.IdRangoMaestraAux

FROM            
dbo.RangosMaestras 
INNER JOIN dbo.RangosVersiones ON dbo.RangosMaestras.IdRangoMaestra = dbo.RangosVersiones.IdRangoMaestra 
INNER JOIN dbo.RangosDetalles ON dbo.RangosVersiones.IdRangoVersion = dbo.RangosDetalles.IdRangoVersion 
INNER JOIN dbo.ComisionesModelosSub ON dbo.RangosMaestras.IdComisionModeloSub = dbo.ComisionesModelosSub.IdComisionModeloSub 
INNER JOIN dbo.VehiculosMarcasGrupos ON dbo.RangosMaestras.CodigoMarcaGrupo = dbo.VehiculosMarcasGrupos.CodigoMarcaGrupo

WHERE        
(RangosMaestras.IdRangoMaestraAux IS NOT NULL)

) AS FACTOR 						  

) AS FACTOR

CROSS JOIN
                             
(SELECT       
Desde, 
Hasta, 
Valor, 
RangosMaestras.IdRangoMaestra,
RangosMaestras.IdComisionModeloSubCriterio AS IdComisionModeloSubCriterioAux,
NombreMaestra AS NombreMaestraAux,
UnidadDeMedidaEscala AS UnidadDeMedidaEscalaAux, 
UnidadDeMedidaValor As UnidadDeMedidaValorAux, 
RangosVersiones.ConsecutivoVersion AS ConsecutivoVersionAux,
RangosVersiones.IdRangoVersion AS IdRangoVersionAux,
RangosDetalles.IdRangoDetalle AS IdRangoDetalleAux

FROM            
dbo.RangosMaestras 
INNER JOIN dbo.RangosVersiones ON dbo.RangosMaestras.IdRangoMaestra = dbo.RangosVersiones.IdRangoMaestra 
INNER JOIN dbo.RangosDetalles ON dbo.RangosVersiones.IdRangoVersion = dbo.RangosDetalles.IdRangoVersion
) AS PORCENTAJE

WHERE        
(FACTOR.IdRangoMaestraAux = PORCENTAJE.IdRangoMaestra)



```
