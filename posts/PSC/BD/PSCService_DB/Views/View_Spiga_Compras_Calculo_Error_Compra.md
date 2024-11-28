# View: View_Spiga_Compras_Calculo_Error_Compra

## Usa los objetos:
- [[Empresas]]
- [[spiga_ComprasDeRepuestosContabilizadas]]

```sql


-- Agosto 29 5:56 p.m.
-- Se Mofifica Vista, retirando la tabla UnidadDeNegocio porque la tabla no tiene campo sección 
-- y no se puede cruzar con la tabla original 

CREATE VIEW [dbo].[View_Spiga_Compras_Calculo_Error_Compra] AS
SELECT a.IdEmpresas, c.NombreEmpresa, a.IdCentros, a.NombreCentro,
    -- b.CodUnidadNegocio, b.NombreUnidadNegocio, 
       Ano_Periodo AS  Ano_Cierre, Mes_Periodo AS Mes_Cierre, 
       SUM(a.Unidades * a.PrecioCompra * (1 - a.DtoPorc))  AS VrCompras
FROM  spiga_ComprasDeRepuestosContabilizadas a
--LEFT JOIN DBMLC_0190..UnidadDeNegocio b ON (b.CodEmpresa = a.IdEmpresas AND
--                                            b.CodCentro  = a.IdCentros) 
LEFT JOIN DBMLC_0190..Empresas c ON (c.CodigoEmpresa = a.IdEmpresas)
                             --  AND c.CodigoEmpresa = b.CodEmpresa)
WHERE a.Ano_Periodo >= 2019
GROUP BY a.IdEmpresas, c.NombreEmpresa, a.IdCentros, a.NombreCentro, 
      -- b.CodUnidadNegocio, b.NombreUnidadNegocio, 
	     a.Ano_Periodo, a.Mes_Periodo
-- ORDER BY a.IdEmpresas, a.IdCentros, a.Ano_Periodo, a.Mes_Periodo

```
