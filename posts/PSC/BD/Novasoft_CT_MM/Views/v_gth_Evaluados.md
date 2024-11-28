# View: v_gth_Evaluados

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[GTH_EvaDesemAsig]]

```sql
-- =============================================
-- Author:		Jorge Diaz
-- Create date: 2020.11.04
-- Description:	Retorna vista con datos para filtros de consulta: Informe Evaluadores Pendientes X Responder
-- =============================================
CREATE VIEW [dbo].[v_gth_Evaluados]
AS
	SELECT	cod_emp_evado, UPPER(dbo.Fn_rhh_NombreCompleto(cod_emp_evado, 1))+
			' - (Cia.:'+RTRIM(cod_cia)+', Proceso:'+RTRIM(cod_eva_des)+', Evaluador:'+RTRIM(cod_emp_evador)+')' AS nom_evado, 
			cod_cia, cod_eva_des, cod_emp_evador 
	FROM	GTH_EvaDesemAsig
	GROUP	BY cod_emp_evado, cod_cia, cod_eva_des, cod_emp_evador;

```
