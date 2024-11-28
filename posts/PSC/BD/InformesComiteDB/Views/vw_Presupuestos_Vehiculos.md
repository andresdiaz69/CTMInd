# View: vw_Presupuestos_Vehiculos

## Usa los objetos:
- [[Presupuestos_Vehiculos]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_Vehiculos]
/*Creado por: Wilder Cahcón 
//Para: Listar los centros por lineas para el modulo de presentación 
//Creado: 14/08/2024 */ 
AS
SELECT  pv.CodigoLinea,				 un.NombreUnidadNegocio NombreLinea,			pv.CodigoCentro,
		un.NombreCentro,             pv.Unidades,									pv.Valor_Arriendo,
		pv.Ano_Periodo,              pv.Mes_Periodo
  FROM  Presupuestos_Vehiculos pv
  JOIN vw_Presupuestos_CentrosPorLinea un
	ON un.CodCentro = pv.CodigoCentro


```
