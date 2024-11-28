# View: V_GTH_PaginasCargoCopiar

## Usa los objetos:
- [[sis_aplicacion]]
- [[web_maestros]]
- [[web_maestrosgen]]
- [[web_paginasmae]]

```sql
CREATE VIEW [dbo].[V_GTH_PaginasCargoCopiar]
AS
SELECT	DISTINCT 1 AS Num, 'Histórico Funciones y Responsabilidades' AS Nom_Pag, 'rhh_cargo_func_resp' AS cod_tabla
FROM	sis_aplicacion AS A
WHERE	(A.cod_apl = 'GTH' OR A.cod_apl = 'SST') AND A.ind_ins = 1
UNION	ALL
SELECT	ROW_NUMBER() OVER (PARTITION BY M.cod_mae ORDER BY P.ord_pag) + 1 AS Num, P.Nom_Pag, MG.tab_hlp AS cod_tabla
FROM	sis_aplicacion AS A
INNER	JOIN web_maestrosgen AS M ON M.cod_mae = 409
INNER	JOIN web_paginasmae AS P ON M.cod_mae = P.cod_mae
INNER	JOIN web_maestros AS MG ON P.cod_mae = MG.cod_mae
		AND  P.Num_Pag = MG.num_pag AND MG.tip_cmp = 'G'
WHERE	A.cod_apl = 'GTH' AND A.ind_ins = 1 AND P.Num_Pag NOT IN (3,13) AND MG.tab_hlp NOT IN ('V_GTH_DocImpRetCar')
UNION	ALL
SELECT	14 AS Num, 'Lugar de Trabajo' AS Nom_Pag, 'SST_CargosLugTrab' AS cod_tabla
FROM	sis_aplicacion AS A
WHERE	A.cod_apl = 'SST' AND A.ind_ins = 1
UNION	ALL
SELECT	15 AS Num, 'Cargos Específicos' AS Nom_Pag, 'SST_CargoCarEsp' AS cod_tabla
FROM	sis_aplicacion AS A
WHERE	A.cod_apl = 'SST' AND A.ind_ins = 1
UNION	ALL
SELECT	16 AS Num, 'Exámenes Médicos' AS Nom_Pag, 'SST_ExaMedicoCargo' AS cod_tabla
FROM	sis_aplicacion AS A
WHERE	A.cod_apl = 'SST' AND A.ind_ins = 1
UNION	ALL
SELECT	17 AS Num, 'Vacunas' AS Nom_Pag, 'SST_VacunasCargo' AS cod_tabla
FROM	sis_aplicacion AS A
WHERE	A.cod_apl = 'SST' AND A.ind_ins = 1

```
