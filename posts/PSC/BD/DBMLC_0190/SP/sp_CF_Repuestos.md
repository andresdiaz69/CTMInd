# Stored Procedure: sp_CF_Repuestos

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]

```sql

CREATE PROC [dbo].[sp_CF_Repuestos] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Repuestos';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	SELECT	Fecha = @FechaIngreso,		IdEmpresa = X.IdEmpresa,	IdLinea = x.IdLinea,
			IdCentro = X.IdCentro,		N1 = @N1,					N2 = @N2,
			N3 = @N3,					Valor = SUM(ISNULL(X.Valor,0))
	FROM	[CF_Datos] X WHERE X.Fecha = @FechaConsulta AND X.N1 = @N1
	GROUP BY	X.IdEmpresa,X.IdLinea,X.IdCentro
END

```
