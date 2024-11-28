# View: v_gen_incons_infcon01

## Usa los objetos:
- [[cnt_puc]]
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[v_gen_infcon]]

```sql

CREATE VIEW [dbo].[v_gen_incons_infcon01]
AS
SELECT v_gen_infcon.*, 'Sin C. costo y es Requerido' AS error
FROM v_gen_infcon WITH(NOLOCK)
	INNER JOIN cnt_puc WITH(NOLOCK) ON v_gen_infcon.cod_cta = cnt_puc.cod_cta
WHERE cod_cco='0' 
	AND ind_cco=1

UNION ALL

SELECT v_gen_infcon.*, 'Sin Tercero y es Requerido' AS error
FROM v_gen_infcon WITH(NOLOCK) 
	INNER JOIN cnt_puc WITH(NOLOCK) ON v_gen_infcon.cod_cta = cnt_puc.cod_cta
WHERE cod_ter='0' 
	AND ind_ter>1

UNION ALL

SELECT v_gen_infcon.*, 'Sin Clasific. 1 y es Requerida' AS error
FROM v_gen_infcon WITH(NOLOCK) 
	INNER JOIN cnt_puc WITH(NOLOCK) ON v_gen_infcon.cod_cta = cnt_puc.cod_cta
WHERE cod_cl1='0' 
	AND ind_cl1=1

UNION ALL

SELECT v_gen_infcon.*, 'Sin Clasific. 2 y es Requerida' AS error
FROM v_gen_infcon WITH(NOLOCK) 
	INNER JOIN cnt_puc WITH(NOLOCK) ON v_gen_infcon.cod_cta = cnt_puc.cod_cta
WHERE cod_cl2='0' 
	AND ind_cl2=1

UNION ALL

SELECT v_gen_infcon.*, 'Sin Clasific. 3 y es Requerida' AS error
FROM v_gen_infcon WITH(NOLOCK) 
	INNER JOIN cnt_puc WITH(NOLOCK) ON v_gen_infcon.cod_cta = cnt_puc.cod_cta
WHERE cod_cl3='0' 
	AND ind_cl3=1

UNION ALL

SELECT v_gen_infcon.*, 'Cuenta no debe ser mayor' AS error
FROM v_gen_infcon WITH(NOLOCK) 
	INNER JOIN cnt_puc WITH(NOLOCK) ON v_gen_infcon.cod_cta = cnt_puc.cod_cta
WHERE cnt_puc.tip_cta=1

UNION ALL

SELECT v_gen_infcon.*, 'Sin Base y es Requerida' AS error
FROM v_gen_infcon WITH(NOLOCK) 
	INNER JOIN cnt_puc WITH(NOLOCK) ON v_gen_infcon.cod_cta = cnt_puc.cod_cta
WHERE cnt_puc.ind_bas=1 
	AND bas_mov=0

UNION ALL

SELECT v_gen_infcon.*, 'La cuenta se encuentra inactiva' AS error
FROM v_gen_infcon WITH(NOLOCK) 
	INNER JOIN cnt_puc WITH(NOLOCK) ON v_gen_infcon.cod_cta = cnt_puc.cod_cta
WHERE cnt_puc.est_cta=2

UNION ALL

SELECT v_gen_infcon.*, 'La cuenta no puede ser 0' AS error
FROM v_gen_infcon WITH(NOLOCK) 
	INNER JOIN cnt_puc WITH(NOLOCK) ON v_gen_infcon.cod_cta = cnt_puc.cod_cta
WHERE cnt_puc.cod_cta='0'

UNION ALL

SELECT v_gen_infcon.*, 'La sucursal: ' + RTRIM(v_gen_infcon.cod_suc) + ' se encuentra inactiva' AS error
FROM v_gen_infcon WITH(NOLOCK) 
	INNER JOIN gen_sucursal WITH(NOLOCK) ON gen_sucursal.cod_suc=v_gen_infcon.cod_suc
WHERE gen_sucursal.est_suc = 2

UNION ALL

SELECT v_gen_infcon.*, 'El centro de costo: ' + RTRIM(v_gen_infcon.cod_cco) + ' se encuentra inactivo' AS error
FROM v_gen_infcon WITH(NOLOCK)
	INNER JOIN gen_ccosto WITH(NOLOCK) ON gen_ccosto.cod_cco=v_gen_infcon.cod_cco
WHERE gen_ccosto.est_cco < 1 
	OR gen_ccosto.est_cco > 1 

UNION ALL

SELECT v_gen_infcon.*, 'El clasificador 1: ' + RTRIM(v_gen_infcon.cod_cl1) + ' se encuentra inactivo' AS error
FROM v_gen_infcon WITH(NOLOCK)
	INNER JOIN gen_clasif1 WITH(NOLOCK) ON gen_clasif1.codigo=v_gen_infcon.cod_cl1
WHERE gen_clasif1.estado < 1 
	OR gen_clasif1.estado > 1

UNION ALL

SELECT v_gen_infcon.*, 'El clasificador 2: ' + RTRIM(v_gen_infcon.cod_cl2) + ' se encuentra inactivo' AS error
FROM v_gen_infcon WITH(NOLOCK)
	INNER JOIN gen_clasif2 WITH(NOLOCK) ON gen_clasif2.codigo=v_gen_infcon.cod_cl2
WHERE gen_clasif2.estado < 1 
	OR gen_clasif2.estado > 1

UNION ALL

SELECT v_gen_infcon.*, 'El clasificador 3: ' + RTRIM(v_gen_infcon.cod_cl3) + ' se encuentra inactivo' AS error
FROM v_gen_infcon WITH(NOLOCK)
	INNER JOIN gen_clasif3 WITH(NOLOCK) ON gen_clasif3.codigo=v_gen_infcon.cod_cl3
WHERE gen_clasif3.estado < 1 
	OR gen_clasif3.estado > 1;

```
