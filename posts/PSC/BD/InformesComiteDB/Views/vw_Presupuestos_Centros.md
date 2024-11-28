# View: vw_Presupuestos_Centros

## Usa los objetos:
- [[vw_Presupuestos_CentrosPorLinea]]

```sql


CREATE VIEW [dbo].[vw_Presupuestos_Centros]
AS

/*Creado por: Wilder Cahcón 
//Para: Listar los centros por lineas para el modulo de presentación 
//Creado: 14/08/2024 */ 

--****************************
--Autor: Manuel Suarez
-- Date: 07/10/2024
--Descr: Alter VW para proyecto presupuestos se cambia la tabla por la vista donde se esta filtrando mayorista y se cambia el modo de excluir colision
--****************************
select CodCentro, NombreCentro, CodUnidadNegocio, NombreUnidadNegocio
  from vw_Presupuestos_CentrosPorLinea
 where NombreCentro not like 'co-%' 


```
