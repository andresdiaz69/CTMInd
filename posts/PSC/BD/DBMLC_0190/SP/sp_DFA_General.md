# Stored Procedure: sp_DFA_General

## Usa los objetos:
- [[sp_DFA_Contabilidad]]
- [[sp_DFA_ContabilidadEquivalencia]]

```sql

CREATE PROC [dbo].[sp_DFA_General]
	@Año INT,
	@Mes INT
AS

BEGIN 
	
	--EJECUTAR PROCEDIMIENTOS PARA LA SINCRONIZACIÓN DEL DFA
	----Contabilidad General del DFA.
	EXEC sp_DFA_Contabilidad @Año, @Mes

	----Cruce Contabilidad con Equivalencias.
	EXEC sp_DFA_ContabilidadEquivalencia @Año, @Mes
	   
END

```
