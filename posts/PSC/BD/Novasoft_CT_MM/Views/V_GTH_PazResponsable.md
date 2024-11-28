# View: V_GTH_PazResponsable

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[GTH_ActividadDesvin]]
- [[GTH_PazAreaEmplea]]
- [[GTH_PazySalvo]]
- [[gth_RolLider]]

```sql
CREATE VIEW [dbo].[V_GTH_PazResponsable]
	AS
	SELECT  PE.cod_pazysalvo, PE.cod_emp, dbo.Fn_rhh_NombreCompleto(PE.cod_emp, 2) AS Responsable, NULL AS emp
	FROM    dbo.GTH_PazySalvo AS PS
	INNER	JOIN dbo.GTH_PazAreaEmplea AS PE ON PS.cod_pazysalvo = PE.cod_pazysalvo
	WHERE	PS.jefe = 0
	UNION ALL
	SELECT  PS.cod_pazysalvo, R.cod_lider, dbo.Fn_rhh_NombreCompleto(R.cod_lider, 2) AS Responsable, AD.cod_emp AS emp
	FROM    dbo.GTH_PazySalvo AS PS
	INNER	JOIN dbo.GTH_ActividadDesvin AS AD ON AD.cod_activ = 3
	INNER	JOIN dbo.gth_RolLider AS R ON AD.cod_emp = R.cod_emp
	WHERE	PS.jefe = 1 AND R.fecha_ini <= GETDATE()
			AND (R.fecha_fin IS NULL OR R.fecha_fin >= GETDATE())
	GROUP	BY PS.cod_pazysalvo, R.cod_lider, AD.cod_emp;
 
```
