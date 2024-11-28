# View: v_GMF_ParamListaLineas

## Usa los objetos:
- [[GMF_7_ValorYPorcentaje]]

```sql




CREATE VIEW [dbo].[v_GMF_ParamListaLineas]
AS
SELECT DISTINCT CodigoPresentacion, NombrePresentacion, Empresa AS 'IdEmpresa', case when Empresa = 1 then 'CASATORO' else 'Motores Y Maquinas MOTORYSA' end AS 'Empresa'
FROM            dbo.GMF_7_ValorYPorcentaje

```
