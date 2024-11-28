# Stored Procedure: sp_CF_CFCMasCostoPM

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]

```sql

CREATE PROC [dbo].[sp_CF_CFCMasCostoPM]
	@FechaConsulta DATE,
	@FechaIngreso DATE
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @CN1 INT, @CDPN1 INT, @N2 INT, @N3 INT;
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = 'CFC + Costo PM');
	SET @CN1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = 'CFC');
	SET @CDPN1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = 'Costo Dir. PM');
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = 'CFC + Costo PM');
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = 'CFC + Costo PM');
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	SELECT	Fecha = @FechaIngreso,		IdEmpresa = X.IdEmpresa,	IdLinea = x.IdLinea,
			IdCentro = X.IdCentro,		N1 = @N1,					N2 = @N2,
			N3 = @N3,					Valor = SUM(ISNULL(X.Valor,0))
	FROM	[CF_Datos] X 
	WHERE X.Fecha = @FechaConsulta AND (X.N1 = @CN1 OR X.N1 = @CDPN1) AND X.N2 = 0 AND X.N3 = 0
	GROUP BY	X.IdEmpresa,X.IdLinea,X.IdCentro
END

```
