# View: V_SST_NivAprobItems

## Usa los objetos:
- [[SST_ProcTipoDocum]]

```sql
CREATE VIEW [dbo].[V_SST_NivAprobItems]
AS
	SELECT tip_doc AS cod_item, nom_tip AS des_item
	FROM SST_ProcTipoDocum
	UNION
	SELECT '001' AS cod_item, 'Objetivos' AS des_item
	UNION
	SELECT '002' AS cod_item, 'Política' AS des_item
	UNION
	SELECT '003' AS cod_item, 'Plan de Emergencia' AS des_item
	UNION
	SELECT '004' AS cod_item, 'Plan Anual de Trabajo' AS des_item
	UNION
	SELECT '005' AS cod_item, 'Programa Anual de Capacitaciones' AS des_item
	UNION
	--SELECT '006' AS cod_item, 'Presupuesto' AS des_item
	--UNION
	SELECT '007' AS cod_item, 'Parametrización de Requisitos Legales' AS des_item
	UNION
	SELECT '008' AS cod_item, 'Cronograma de Inspecciones' AS des_item
	UNION
	SELECT '009' AS cod_item, 'Programa de Vigilancia Epidemiológica' AS des_item
```
