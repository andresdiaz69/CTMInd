# View: vw_JefeDeRepuestosMazda_15

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]

```sql




CREATE VIEW [dbo].[vw_JefeDeRepuestosMazda_15]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, SUM(ValorNetoTaller) AS ValorNetoTaller
FROM            (SELECT        dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa,
					dbo.ComisionesSpigaTallerPorOT.Empresa, dbo.ComisionesSpigaTallerPorOT.CodigoCentro, dbo.ComisionesSpigaTallerPorOT.Centro,dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller,(dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas 
                                                    * dbo.ComisionesSpigaTallerPorOT.ValorUnitario - dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario * 
													dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento / 100) AS ValorNetoTaller
                          FROM            dbo.ComisionesSpigaTallerPorOT
                          WHERE        
						  (TipoOperacion = 'MAT' AND CodigoCentro = 2)
						  AND (dbo.ComisionesSpigaTallerPorOT.FechaFactura <= '20191031')
						  
						  ) AS ValorNeto
						  GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro


```
