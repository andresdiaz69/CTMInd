# View: vw_Presupuestos_Diversos

## Usa los objetos:
- [[Presupuestos_Diversos]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql

CREATE VIEW [dbo].[vw_Presupuestos_Diversos]
/*Creado por: Felipe Silva 
//Para: Contenido del grid del formulario Presupuestos Diversos
//Creado: 14/08/2024 */ 
AS
SELECT  pv.IdClase,
		pv.CodigoLinea,				 un.NombreUnidadNegocio NombreLinea,			pv.CodigoCentro,
		un.NombreCentro,             pv.DIV_Servicio_Aseo,							pv.Vigilancia,			pv.Gastos_Ambientales,
		pv.Ano_Periodo,              pv.Mes_Periodo,
		pv.DIV_Insumos_de_Aseo,
		pv.Utiles_Papeleria_Fotocopias,
		pv.Dotacion,
		pv.Temporales_Mensajeria,
		pv.Encuadernacion_y_Empaste,
		pv.Construcciones_y_Edificaciones,
		pv.Equipo_de_oficina
  FROM  
		Presupuestos_Diversos pv
  JOIN 
		vw_Presupuestos_CentrosPorLinea un
		ON un.CodCentro = pv.CodigoCentro

```
