# View: vw_AsesorComercialVehiculosUsadosPorComV2_3

## Usa los objetos:
- [[vw_AsesorComercialVehiculosUsadosPorComV2_2]]
- [[vw_RangosMaestrasFull_Vehiculos]]

```sql


















CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosPorComV2_3]
AS

SELECT *,

CASE WHEN ValorComision = 0 THEN 1 ELSE 0 END AS ModeloVehSinComision

FROM 

(

SELECT        Ano_Periodo, Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, NumeroFactura, VIN, TotalFactura, 
                         TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, 
						 
						 CodigoMArca, 
						 Marca, 
						 CodigoMarcaGrupo,
						 MarcaGrupo,
						 
						 CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, NombreVendedor, 
                         IdLiquidacion, IdHistorico, 
						 
						 PrecioLista, 
						 ValorDto,
						 PrecioBaseComision,
						 
						 VehiculosRecaudados, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio,

						 ISNULL((
						 SELECT        TOP (1) ComisionPorUnidad
                         FROM            vw_RangosMaestrasFull_Vehiculos
                         WHERE  
						 (vw_RangosMaestrasFull_Vehiculos.IdRangoMaestra = vw_AsesorComercialVehiculosUsadosPorComV2_2.IdRangoMaestra) AND 
						 (vw_RangosMaestrasFull_Vehiculos.IdRangoVersion = vw_AsesorComercialVehiculosUsadosPorComV2_2.IdRangoVersionMax) AND 
						 (vw_RangosMaestrasFull_Vehiculos.Desde_Precio < vw_AsesorComercialVehiculosUsadosPorComV2_2.PrecioBaseComision) AND 
						 (vw_RangosMaestrasFull_Vehiculos.Hasta_Precio >= vw_AsesorComercialVehiculosUsadosPorComV2_2.PrecioBaseComision) AND 
						 (vw_RangosMaestrasFull_Vehiculos.Desde_Unidades < vw_AsesorComercialVehiculosUsadosPorComV2_2.VehiculosRecaudados) AND 
                         (vw_RangosMaestrasFull_Vehiculos.Hasta_Unidades >= vw_AsesorComercialVehiculosUsadosPorComV2_2.VehiculosRecaudados)
						 --JCS:2024/03/12 - PARA QUE CRUCE CORRECTAMENTE CON LA ULTIMA VERSION
						 ORDER BY vw_RangosMaestrasFull_Vehiculos.IdRangoVersionAux desc
						 ), 0) 
						 AS ValorComision

FROM            vw_AsesorComercialVehiculosUsadosPorComV2_2

) AS PRE


```
