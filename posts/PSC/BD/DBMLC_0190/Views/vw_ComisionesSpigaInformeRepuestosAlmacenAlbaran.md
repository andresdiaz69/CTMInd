# View: vw_ComisionesSpigaInformeRepuestosAlmacenAlbaran

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]

```sql

CREATE VIEW [dbo].[vw_ComisionesSpigaInformeRepuestosAlmacenAlbaran]
AS
SELECT        Id, IdComisionSpiga, Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, CodigoEmpresa, Empresa, CodigoCentro, Centro, CodigoSeccion, Seccion, FechaFactura, NumeroFactura, NumeroAlbaran, TipoMov, Marca, Referencia, 
                         DescripcionReferencia, Nitcliente, NombreCliente, CodigoCategoriaCliente, CategoriaCliente, UnidadesVendidas, CostoReferencia, ValorUnitarioReferencia, PorcDescuento, Impuestos, CodClasificacion1Mov, Clasificacion1Mov, 
                         CodClasificacion2Mov, Clasificacion2Mov, CodClasificacion3Mov, Clasificacion3Mov, CodClasificacion4Mov, Clasificacion4Mov, CodClasificacion5Mov, Clasificacion5Mov, CodClasificacion6Mov, Clasificacion6Mov, 
                         CedulaVendedorRepuestos, NombreVendedorRepuestos, CedulaBodeguero, NombreBodeguero, VentaCampaña, ValorNeto, 
                         
						 CASE 
						 WHEN TipoMov = 'VIN' THEN 'Interna' 
						 WHEN TipoMov = 'VINA' THEN 'Interna' 
						 ELSE 'Cliente' 
						 END AS TipoVenta

FROM            dbo.ComisionesSpigaAlmacenAlbaran



```
