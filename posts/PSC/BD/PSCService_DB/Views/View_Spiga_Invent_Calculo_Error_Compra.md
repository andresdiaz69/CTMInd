# View: View_Spiga_Invent_Calculo_Error_Compra

## Usa los objetos:
- [[Empresas]]
- [[spiga_InventarioRepuestosDetallado]]
- [[UnidadDeNegocio]]

```sql



-- Ago 29 6:57 P.M
-- Se Modifica para NO Agrupar Sección y permitir cruce con compras
-- Septiembre 04 10:27
-- Se Modifica para que UltAñoCompra & FechaUltimaCompra Que sean NULL Tome FechaTraspasoTRE

CREATE VIEW [dbo].[View_Spiga_Invent_Calculo_Error_Compra] AS
SELECT a.IdEmpresas, c.NombreEmpresa, a.IdCentros, a.NombreCentro, --MAX(a.FechaTraspasoTRE) AS FechaTraspasoTRE, 
       b.CodUnidadNegocio, b.NombreUnidadNegocio, a.Ano_Periodo AS Ano_Cierre, a.Mes_Periodo AS Mes_Cierre,
      YEAR(a.FechaTMP) AS UltAñoCompra,
    --   CASE
	   --    WHEN YEAR(a.FechaUltimaCompra) IS NOT NULL THEN YEAR(a.FechaUltimaCompra)
		  -- ELSE
	   --     YEAR(MAX(a.FechaTraspasoTRE))
	   --END AS UltAñoCompra, 
 ---	   
       
     -- MONTH(a.FechaUltimaCompra) AS UltMesCompra,
	 MONTH(a.FechaTMP) AS UltMesCompra, 
     -- CASE
	    --   WHEN MONTH(a.FechaUltimaCompra) IS NOT NULL THEN MONTH(a.FechaUltimaCompra)
		   --ELSE
	    --    MONTH(MAX(a.FechaTraspasoTRE))
	   --END AS UltMesCompra, 
--
	   SUM(a.PrecioMedio*a.Stock) AS ValorPrecioMedio, 
	   COUNT(a.IdReferencias) AS NumReferencias
FROM  spiga_InventarioRepuestosDetallado a
LEFT JOIN DBMLC_0190..UnidadDeNegocio b ON (b.CodEmpresa = a.IdEmpresas AND
                                            b.CodCentro  = a.IdCentros  AND
											b.CodSeccion = a.IdSecciones) 
LEFT JOIN DBMLC_0190..Empresas c ON (c.CodigoEmpresa = a.IdEmpresas AND
                                     c.CodigoEmpresa = b.CodEmpresa)
WHERE a.Ano_Periodo >= 2019
GROUP BY a.IdEmpresas, c.NombreEmpresa, a.IdCentros, a.NombreCentro, --a.IdSecciones, 
     --    b.CodUnidadNegocio, b.NombreUnidadNegocio, YEAR(a.FechaUltimaCompra), MONTH(a.FechaUltimaCompra), a.Ano_Periodo, a.Mes_Periodo
        b.CodUnidadNegocio, b.NombreUnidadNegocio, YEAR(a.FechaTMP), MONTH(a.FechaTMP), a.Ano_Periodo, a.Mes_Periodo



```
