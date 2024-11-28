# View: vw_DFA_Parametrizacion_Clases

## Usa los objetos:
- [[DFA_Parametrizacion_Clases]]
- [[DFA_Parametrizacion_SubClases]]

```sql
CREATE VIEW [dbo].[vw_DFA_Parametrizacion_Clases] AS
SELECT DISTINCT
	CodClase,			Clase,					CodSubClase,
	SubClase,			Observaciones,			Activo,
	CodSubClaseIgual
FROM 
(
	SELECT DISTINCT
		SC.CodClase,		C.Clase,				SC.CodSubClase, 
		SC.SubClase,		SC.Observaciones,		SC.Activo,
		CASE WHEN SC.CodClase IN (1, 2, 3, 4) THEN 1 
			ELSE 0 END CodSubClaseIgual

	FROM DFA_Parametrizacion_SubClases SC

	LEFT JOIN DFA_Parametrizacion_Clases C on SC.CodClase = C.CodClase

	UNION ALL

	SELECT DISTINCT
		CodClase = '0',			Clase = 'Nombres Cuentas DFA',		CodSubClase = '0',
		SubClase = '',			Observaciones = '',					Activo = 1,
		CodSubClaseIgual = 0
) A

```
