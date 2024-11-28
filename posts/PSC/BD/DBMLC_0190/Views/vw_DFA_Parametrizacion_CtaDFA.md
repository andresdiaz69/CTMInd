# View: vw_DFA_Parametrizacion_CtaDFA

## Usa los objetos:
- [[DFA_Parametrizacion_CtaDFA]]
- [[DFA_Parametrizacion_SubClases]]

```sql

CREATE VIEW [dbo].[vw_DFA_Parametrizacion_CtaDFA] AS
SELECT DISTINCT 
	CodDFA,					NombreCuenta,			CodTipoCuenta,
	NombreTipoCuenta,		Observaciones
FROM 
(
	SELECT DISTINCT 
		Cta.CodDFA,							Cta.NombreCuenta,			
		CodTipoCuenta = Cta.TipoCuenta,		NombreTipoCuenta = C.SubClase,		
		Cta.Observaciones

	FROM DFA_Parametrizacion_CtaDFA Cta

	LEFT JOIN DFA_Parametrizacion_SubClases C
			ON Cta.TipoCuenta = C.CodSubClase 
				AND C.CodClase = 5
) A

```
