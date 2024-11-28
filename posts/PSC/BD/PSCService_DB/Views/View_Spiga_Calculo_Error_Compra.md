# View: View_Spiga_Calculo_Error_Compra

## Usa los objetos:
- [[View_Spiga_Compras_Calculo_Error_Compra]]
- [[View_Spiga_Invent_Calculo_Error_Compra]]

```sql

-- Agosto 29 7:18 p.m. 
-- Se Modifica esta vista completamente (no era funcional) 
-- 01/12/2020
CREATE VIEW  
[dbo].[View_Spiga_Calculo_Error_Compra] AS
--SELECT a.IdEmpresas, a.NombreEmpresa, a.IdCentros, a.NombreCentro, YEAR(a.FechaDeCorte) AS  Ano_Cierre, MONTH(a.FechaDeCorte) AS Mes_Cierre, 
--	   SUM(a.ValorPM) AS ValorPrecioMedio,
--	   SUM(a.NumLineas) AS NumReferencias
--	   ,(SELECT SUM(c.unidades*c.PrecioCompra * (1 - c.DtoPorc)) FROM spiga_ComprasDeRepuestosContabilizadas c 
--	     WHERE a.IdEmpresas = c.IdEmpresas AND
--		       a.IdCentros  = c.IdCentros AND
--			   YEAR(a.FechaDeCorte) = YEAR(c.FechaDeCorte) AND
--			   MONTH(a.FechaDeCorte) = MONTH(c.FechaDeCorte) AND
--			   YEAR(c.FechaDeCorte) > 2019
--		 GROUP by c.IdEmpresas, c.IdCentros, YEAR(c.FechaDeCorte), MONTH(c.FechaDeCorte)) AS VrCompras, b.NombreUnidadNegocio AS Marca
--FROM  spiga_InventarioRepuestosResumido a
--LEFT JOIN DBMLC_0190..UnidadDeNegocio b ON (b.CodEmpresa = a.IdEmpresas AND
--                                            b.CodCentro  = a.IdCentros  AND
--											b.CodSeccion = a.IdSecciones) 
--WHERE YEAR(a.FechaDeCorte) > 2019
--GROUP BY b.NombreUnidadNegocio, a.IdEmpresas, a.IdCentros, a.NombreEmpresa, a.NombreCentro, YEAR(a.FechaDeCorte), MONTH(a.FechaDeCorte)
SELECT a.*, b.VrCompras
FROM 
View_Spiga_Invent_Calculo_Error_Compra a
LEFT JOIN View_Spiga_Compras_Calculo_Error_Compra b ON (a.IdEmpresas = b.IdEmpresas AND
                                                        a.IdCentros  = b.IdCentros  AND
														a.UltAñoCompra = b.Ano_Cierre AND
														a.UltMesCompra = b.Mes_Cierre)



```
