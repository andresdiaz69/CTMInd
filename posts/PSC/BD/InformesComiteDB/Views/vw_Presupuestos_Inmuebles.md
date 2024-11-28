# View: vw_Presupuestos_Inmuebles

## Usa los objetos:
- [[Presupuestos_Inmuebles]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_Inmuebles]
AS
SELECT convert(char(10),pim.CodUnidadNegocio) as CodUnidadNegocio,
pim.NombreUnidadNegocio,    convert(char(10),pim.CodCentro) as CodCentro,
pim.NombreCentro,     pim.Arriendo_Inicial,     pim.Arriendo_Futuro, 
       pim.Arriendo_Mes_Aumento,    pim.Ano_Periodo,            pim.Mes_Periodo
  FROM (SELECT distinct un.CodUnidadNegocio,   un.NombreUnidadNegocio,     un.CodCentro,      un.NombreCentro,    pin.Arriendo_Inicial, 
                        pin.Arriendo_Futuro,   pin.Arriendo_Mes_Aumento,   pin.Ano_Periodo,   pin.Mes_Periodo
          FROM Presupuestos_Inmuebles pin
          INNER JOIN vw_Presupuestos_CentrosPorLinea un   
		  --DBMLC_0190.[dbo].[UnidadDeNegocio] un
	          ON un.CodUnidadNegocio = pin.CodigoLinea AND 
		         un.CodCentro        = pin.CodigoCentro 
	) pim


```
