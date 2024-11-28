# View: vw_cMandos_ComisionesSpigaAlmacenAlbaran

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]

```sql





CREATE VIEW [dbo].[vw_cMandos_ComisionesSpigaAlmacenAlbaran]
AS
SELECT      Id, IdComisionSpiga, Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, CodigoEmpresa, Empresa, 
		case 
			when CodigoEmpresa = 1 and CodigoCentro = 28 then 28000+CodigoSeccion
			when CodigoEmpresa = 6 and CodigoCentro = 28 then 28000+CodigoSeccion
			else CodigoCentro
		end
		CodigoCentro, 
		Centro, CodigoSeccion, Seccion, FechaFactura, NumeroFactura, NumeroAlbaran, TipoMov, Marca, Referencia, 
        DescripcionReferencia, Nitcliente, NombreCliente, CodigoCategoriaCliente, CategoriaCliente, UnidadesVendidas, CostoReferencia, ValorUnitarioReferencia, PorcDescuento, Impuestos, CodClasificacion1Mov, Clasificacion1Mov, 
        CodClasificacion2Mov, Clasificacion2Mov, CodClasificacion3Mov, Clasificacion3Mov, CodClasificacion4Mov, Clasificacion4Mov, CodClasificacion5Mov, Clasificacion5Mov, CodClasificacion6Mov, Clasificacion6Mov, 
		CedulaVendedorRepuestos, NombreVendedorRepuestos, CedulaBodeguero, NombreBodeguero, VentaCampaña, ValorNeto, CostoReferencia * UnidadesVendidas AS CostoNeto
FROM dbo.ComisionesSpigaAlmacenAlbaran

```
