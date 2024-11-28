# View: v_gth_Proc_hist

## Usa los objetos:
- [[GTH_Decisiones_Proc_vinculados]]
- [[GTH_Emp_vinculados]]
- [[GTH_Estado_disciplinario]]
- [[GTH_LlamMotivo]]
- [[GTH_ProcesoDisciplinario]]

```sql

CREATE VIEW [dbo].[v_gth_Proc_hist]
AS
	SELECT b.Cod_Proc,a.Cod_emp,b.Fec_reg,b.Fec_Inc,c.des_mot,d.nom_est,b.Suceso, 
	b.Impacto,b.Articulos,b.Fec_cie,b.Descartar,E.Observaciones
	FROM GTH_Emp_vinculados a
	INNER JOIN GTH_ProcesoDisciplinario b
	ON a.Cod_Proc = b.Cod_Proc
	INNER JOIN GTH_LlamMotivo c ON
	b.cod_mot = c.cod_mot
	INNER JOIN GTH_Estado_disciplinario d ON
	b.cod_est_dis = d.cod_est
	LEFT JOIN GTH_Decisiones_Proc_vinculados e
	ON b.Cod_Proc = e.Cod_Proc
	AND e.Registro = (SELECT MAX(Registro) FROM
	GTH_Decisiones_Proc_vinculados WHERE Cod_Proc = a.Cod_Proc);

```
