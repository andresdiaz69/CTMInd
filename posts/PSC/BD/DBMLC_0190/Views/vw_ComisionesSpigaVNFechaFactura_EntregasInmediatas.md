# View: vw_ComisionesSpigaVNFechaFactura_EntregasInmediatas

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVNFechaFactura]]

```sql





CREATE VIEW [dbo].[vw_ComisionesSpigaVNFechaFactura_EntregasInmediatas]
AS
SELECT        dbo.ComisionesSpigaVNFechaFactura.Id, dbo.ComisionesSpigaVNFechaFactura.IdComisionSpiga, dbo.ComisionesSpigaVNFechaFactura.Ano_Periodo, dbo.ComisionesSpigaVNFechaFactura.Mes_Periodo, 
                         dbo.ComisionesSpigaVNFechaFactura.Ano_Spiga, dbo.ComisionesSpigaVNFechaFactura.Mes_Spiga, dbo.ComisionesSpigaVNFechaFactura.Codigoempresa, dbo.ComisionesSpigaVNFechaFactura.Empresa, 
                         dbo.ComisionesSpigaVNFechaFactura.CodigoCentro, dbo.ComisionesSpigaVNFechaFactura.Centro, dbo.ComisionesSpigaVNFechaFactura.CodigoSeccion, dbo.ComisionesSpigaVNFechaFactura.Seccion, 
                         dbo.ComisionesSpigaVNFechaFactura.FechaFactura, dbo.ComisionesSpigaVNFechaFactura.NumeroFactura, dbo.ComisionesSpigaVNFechaFactura.VIN, dbo.ComisionesSpigaVNFechaFactura.CodigoMArca, 
                         dbo.ComisionesSpigaVNFechaFactura.Marca, dbo.ComisionesSpigaVNFechaFactura.CodigoGama, dbo.ComisionesSpigaVNFechaFactura.Gama, dbo.ComisionesSpigaVNFechaFactura.CodigoModelo, 
                         dbo.ComisionesSpigaVNFechaFactura.Extension, dbo.ComisionesSpigaVNFechaFactura.AñoModelo, dbo.ComisionesSpigaVNFechaFactura.Modelo, dbo.ComisionesSpigaVNFechaFactura.CodigoVersion, 
                         dbo.ComisionesSpigaVNFechaFactura.NombreVersion, dbo.ComisionesSpigaVNFechaFactura.CedulaVendedor, dbo.ComisionesSpigaVNFechaFactura.NombreVendedor, dbo.ComisionesSpigaVNFechaFactura.Nit, 
                         dbo.ComisionesSpigaVNFechaFactura.nombreTercero, dbo.ComisionesSpigaVNFechaFactura.PrecioVehiculo, dbo.ComisionesSpigaVNFechaFactura.PrecioLista, dbo.ComisionesSpigaVNFechaFactura.ValorDto, 
                         dbo.ComisionesSpigaVNFechaFactura.ImporteImpuestos, dbo.ComisionesSpigaVNFechaFactura.TotalFactura, dbo.ComisionesSpigaVNFechaFactura.FechaCancelacionFactura, 
                         dbo.ComisionesSpigaVNFechaFactura.TotalCanceladoFactura, dbo.ComisionesSpigaVNFechaFactura.FechaRemesa, dbo.ComisionesSpigaVNFechaFactura.ValorRemesado, 
                         dbo.ComisionesSpigaVNFechaFactura.FechaEntregaCliente, dbo.ComisionesSpigaVNFechaFactura.DescuentoPolitica, dbo.ComisionesSpigaVNFechaFactura.NumerEntregas, 
                         dbo.ComisionesSpigaVNFechaFactura.Tipo_Servicio, dbo.ComisionesSpigaVNFechaFactura.CuotaReteFuente, dbo.ComisionesSpigaVNFechaFactura.Procedencia, dbo.ComisionesSpigaVNFechaFactura.ProcedenciaDetalle, 
                         dbo.ComisionesSpigaVNFechaFactura.TipoOportunidad, dbo.ComisionesSpigaVN.Id AS Id_VN, dbo.ComisionesSpigaVN.IdComisionSpiga AS IdComisionSpiga_VN,

						 CASE 
						 WHEN dbo.ComisionesSpigaVN.Id IS NOT NULL THEN CAST(1 as bit)
						 ELSE CAST(0 as bit)
						 END AS Entregado

FROM            dbo.ComisionesSpigaVNFechaFactura LEFT OUTER JOIN
                         dbo.ComisionesSpigaVN ON dbo.ComisionesSpigaVNFechaFactura.CodigoModelo = dbo.ComisionesSpigaVN.CodigoModelo AND dbo.ComisionesSpigaVNFechaFactura.CodigoGama = dbo.ComisionesSpigaVN.CodigoGama AND 
                         dbo.ComisionesSpigaVNFechaFactura.CodigoMArca = dbo.ComisionesSpigaVN.CodigoMArca AND dbo.ComisionesSpigaVNFechaFactura.Codigoempresa = dbo.ComisionesSpigaVN.Codigoempresa AND 
                         dbo.ComisionesSpigaVNFechaFactura.NumeroFactura = dbo.ComisionesSpigaVN.NumeroFactura AND dbo.ComisionesSpigaVNFechaFactura.VIN = dbo.ComisionesSpigaVN.VIN
WHERE        

(dbo.ComisionesSpigaVNFechaFactura.NombreVendedor LIKE '%Entregas Inmediatas%' OR dbo.ComisionesSpigaVNFechaFactura.NombreVendedor LIKE '%Equirent%') 
AND 
(dbo.ComisionesSpigaVNFechaFactura.Nit = '8600518946' OR dbo.ComisionesSpigaVNFechaFactura.Nit = '9012530154')


```
