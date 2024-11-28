# Stored Procedure: sp_CF_Uso

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]

```sql

CREATE PROC [dbo].[sp_CF_Uso]
	@FechaConsulta DATE,
	@FechaIngreso DATE
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @AN1 INT, @PN1 INT, @N2 INT, @N3 INT;
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = 'USO');
	SET @AN1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = 'TOTAL SUMA ACTIVOS');
	SET @PN1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = 'TOTAL SUMA PASIVOS');
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = 'USO');
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = 'USO');
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	SELECT	Fecha = @FechaIngreso,		IdEmpresa = X.IdEmpresa,					IdLinea = x.IdLinea,
			IdCentro = X.IdCentro,		N1 = @N1,									N2 = @N2,
			N3 = @N3,					Valor = SUM(X.Valor1) + SUM(X.Valor2)
	FROM	
	(
		SELECT	Fecha = @FechaIngreso,				IdEmpresa = X.IdEmpresa,				IdLinea = x.IdLinea,
				IdCentro = X.IdCentro,				N1 = @N1,								N2 = @N2,
				N3 = @N3,
				Valor1 = SUM(CASE WHEN (X.N1 = @AN1 AND X.N2 = 0 AND X.N3 = 0) THEN ISNULL(X.Valor,0) ELSE 0 END),
				Valor2 = SUM(CASE WHEN (X.N1 = @PN1 AND X.N2 = 0 AND X.N3 = 0) THEN (-1 * ISNULL(X.Valor,0)) ELSE 0 END)
		FROM	[CF_Datos] X WHERE X.Fecha = @FechaConsulta AND (X.N1 = @AN1 OR X.N1 = @PN1) AND X.N2 = 0 AND X.N3 = 0
		GROUP BY	X.IdEmpresa,X.IdLinea,X.IdCentro
	) X
	GROUP BY	X.IdEmpresa,X.IdLinea,X.IdCentro
END

```
