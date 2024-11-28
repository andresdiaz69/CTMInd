# View: v_gen_incons_infnif01

## Usa los objetos:
- [[nif_puc]]
- [[v_gen_infnif]]

```sql

/*SE CREA LA VISTA PARA NIIF FASE 2
JRAMOS DICIEMBRE/2013
SRS 2013-1275
SE MODIFICA LA CONSULTA A LA VISTA v_gen_infnif
JSARMIENTO JUNIO/2014 SRS: 2014-0202*/
CREATE VIEW [dbo].[v_gen_incons_infnif01]
AS

SELECT v_gen_infnif.*, nif_puc.ind_cco, 'Sin C. costo y es Requerido' AS error
FROM v_gen_infnif WITH(NOLOCK)
	INNER JOIN nif_puc WITH(NOLOCK) ON v_gen_infnif.cod_cta = nif_puc.cod_cta
WHERE cod_cco='0'
	AND ind_cco=1

UNION ALL

SELECT v_gen_infnif.*, CASE nif_puc.ind_ter WHEN 1 THEN 0 ELSE 1 END, 'Sin Tercero y es Requerido' AS error
FROM v_gen_infnif WITH(NOLOCK) 
	INNER JOIN nif_puc WITH(NOLOCK) ON v_gen_infnif.cod_cta = nif_puc.cod_cta
WHERE cod_ter='0' 
	AND ind_ter>1

UNION ALL

SELECT v_gen_infnif.*, nif_puc.ind_cl1, 'Sin Clasific. 1 y es Requerida' AS error
FROM v_gen_infnif WITH(NOLOCK) 
	INNER JOIN nif_puc WITH(NOLOCK) ON v_gen_infnif.cod_cta = nif_puc.cod_cta
WHERE cod_cl1='0' 
	AND ind_cl1=1

UNION ALL

SELECT v_gen_infnif.*, nif_puc.ind_cl2, 'Sin Clasific. 2 y es Requerida' AS error
FROM v_gen_infnif WITH(NOLOCK) 
	INNER JOIN nif_puc WITH(NOLOCK) ON v_gen_infnif.cod_cta = nif_puc.cod_cta
WHERE cod_cl2='0'
	AND ind_cl2=1

UNION ALL

SELECT v_gen_infnif.*, nif_puc.ind_cl3, 'Sin Clasific. 3 y es Requerida' AS error
FROM v_gen_infnif WITH(NOLOCK) 
	INNER JOIN nif_puc WITH(NOLOCK) ON v_gen_infnif.cod_cta = nif_puc.cod_cta
WHERE cod_cl3='0'
	AND ind_cl3=1

UNION ALL

SELECT v_gen_infnif.*, nif_puc.tip_cta, 'Cuenta no debe ser mayor' AS error
FROM v_gen_infnif WITH(NOLOCK)
	INNER JOIN nif_puc WITH(NOLOCK) ON v_gen_infnif.cod_cta = nif_puc.cod_cta
WHERE nif_puc.tip_cta=1

UNION ALL

SELECT v_gen_infnif.*, CASE nif_puc.ind_bas WHEN 2 THEN 0 ELSE 1 END, 'Sin Base y es Requerida' AS error
FROM v_gen_infnif  WITH(NOLOCK) 
	INNER JOIN nif_puc WITH(NOLOCK) ON v_gen_infnif.cod_cta = nif_puc.cod_cta
WHERE nif_puc.ind_bas=1 
	AND bas_mov=0

UNION ALL

SELECT v_gen_infnif.*, nif_puc.est_cta, 'La cuenta se encuentra inactiva' AS error
FROM v_gen_infnif WITH(NOLOCK) 
	INNER JOIN nif_puc WITH(NOLOCK) ON v_gen_infnif.cod_cta = nif_puc.cod_cta
WHERE nif_puc.est_cta=2

UNION ALL

SELECT v_gen_infnif.*, nif_puc.cod_cta, 'La cuenta no puede ser 0' AS error
FROM v_gen_infnif WITH(NOLOCK)
	INNER JOIN nif_puc WITH(NOLOCK) ON v_gen_infnif.cod_cta = nif_puc.cod_cta
WHERE nif_puc.cod_cta='0';

```
