# View: v_gth_Evaluadores

## Usa los objetos:
- [[GTH_EvaDesemAsig]]
- [[V_GTH_EVALDESEM]]

```sql
-- =============================================
-- Author:		Jorge Diaz
-- Create date: 2020.11.04
-- Description:	Retorna vista con datos para filtros de consulta: Informe Evaluadores Pendientes X Responder
-- =============================================
CREATE VIEW [dbo].[v_gth_Evaluadores]
AS
	SELECT	ED.cod_emp_evador, UPPER(RTRIM(E.nom_emp_evador))+' - (Cia.:'+RTRIM(ED.cod_cia)+', Proceso:'+RTRIM(ED.cod_eva_des)+')' AS nom_evador, 
			ED.cod_cia, ED.cod_eva_des 
	FROM	GTH_EvaDesemAsig AS ED 
	INNER	JOIN V_GTH_EVALDESEM AS E ON ED.cod_emp_evador = E.cod_evador
	GROUP	BY ED.cod_emp_evador, RTRIM(E.nom_emp_evador), ED.cod_cia, ED.cod_eva_des;

```
