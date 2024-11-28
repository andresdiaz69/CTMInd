# View: vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[Empleados]]

```sql
CREATE VIEW [dbo].[vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran]
AS
SELECT        dbo.ComisionesSpigaAlmacenAlbaran.Id, dbo.ComisionesSpigaAlmacenAlbaran.IdComisionSpiga, dbo.ComisionesSpigaAlmacenAlbaran.Ano_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Periodo, 
                         dbo.ComisionesSpigaAlmacenAlbaran.Ano_Spiga, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Spiga, 
						 
						 -- JCS: 03/05/2023 
						 -- SI EL VENDEDOR DE REPUESTOS ES DE CT O MM, Y VENDIO ALGO POR BN, SE LE DEBE PAGAR POR SU EMPRESA
						 -- APLICA SÓLO PARA EL ESQUEMA DE ACCESORIOS DE VENDEDORES VN

						 CASE 
						 WHEN Empleados.CodigoEmpresa = 1 AND dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa = 5 THEN 1
						 WHEN Empleados.CodigoEmpresa = 6 AND dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa = 5 THEN 6
						 ELSE dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa
						 END AS CodigoEmpresa,

						 CASE 
						 WHEN Empleados.CodigoEmpresa = 1 AND dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa = 5 THEN 'CasaToro'
						 WHEN Empleados.CodigoEmpresa = 6 AND dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa = 5 THEN 'Motores y Máquinas'
						 ELSE dbo.ComisionesSpigaAlmacenAlbaran.Empresa
						 END AS Empresa,

                         dbo.ComisionesSpigaAlmacenAlbaran.CodigoCentro, dbo.ComisionesSpigaAlmacenAlbaran.Centro, dbo.ComisionesSpigaAlmacenAlbaran.CodigoSeccion, 
                         dbo.ComisionesSpigaAlmacenAlbaran.Seccion, dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura, dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura, dbo.ComisionesSpigaAlmacenAlbaran.NumeroAlbaran, 
                         dbo.ComisionesSpigaAlmacenAlbaran.TipoMov, dbo.ComisionesSpigaAlmacenAlbaran.Marca, dbo.ComisionesSpigaAlmacenAlbaran.Referencia, dbo.ComisionesSpigaAlmacenAlbaran.DescripcionReferencia, 
                         dbo.ComisionesSpigaAlmacenAlbaran.Nitcliente, dbo.ComisionesSpigaAlmacenAlbaran.NombreCliente, dbo.ComisionesSpigaAlmacenAlbaran.CodigoCategoriaCliente, dbo.ComisionesSpigaAlmacenAlbaran.CategoriaCliente, 
                         dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas, dbo.ComisionesSpigaAlmacenAlbaran.CostoReferencia, dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia, 
                         dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento, dbo.ComisionesSpigaAlmacenAlbaran.Impuestos, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion1Mov, 
                         dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion2Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion2Mov, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion3Mov, 
                         dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion3Mov, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion4Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion4Mov, 
                         dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion5Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion5Mov, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion6Mov, 
                         dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion6Mov, dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos, dbo.ComisionesSpigaAlmacenAlbaran.NombreVendedorRepuestos, 
                         dbo.ComisionesSpigaAlmacenAlbaran.CedulaBodeguero, dbo.ComisionesSpigaAlmacenAlbaran.NombreBodeguero, dbo.ComisionesSpigaAlmacenAlbaran.VentaCampaña, dbo.ComisionesSpigaAlmacenAlbaran.ValorNeto
FROM            dbo.ComisionesSpigaAlmacenAlbaran LEFT OUTER JOIN
                         dbo.Empleados ON dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos = dbo.Empleados.CodigoEmpleado

```
