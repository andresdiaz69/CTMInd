# Stored Procedure: sp_CF_CFC

## Usa los objetos:
- [[CF_Datos]]
- [[CF_EmpresaPorcentaje]]
- [[CF_Tipos]]

```sql

CREATE PROC [dbo].[sp_CF_CFC]
	@FechaConsulta DATE,
	@FechaIngreso DATE
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @UN1 INT, @N2 INT, @N3 INT, @Dias INT;
	--SET @Dias = DAY(DATEADD(DAY,-1,DATEADD(MONTH,1,DATEFROMPARTS(YEAR(@FechaConsulta), MONTH(@FechaConsulta), 1))));
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = 'CFC');
	SET @UN1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = 'USO');
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = 'CFC');
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = 'CFC');
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	SELECT	 Fecha = @FechaIngreso		,CF.IdEmpresa		,CF.IdLinea
			,CF.IdCentro				,N1 = @N1			,N2 = @N2
			,N3 = @N3					,Valor = (SUM(CF.Valor) * (ISNULL(EP.Porcentaje,0)/100)) --/ @Dias
	FROM	[CF_Datos] AS CF 
	LEFT JOIN (
		SELECT * FROM CF_EmpresaPorcentaje
		WHERE Año = YEAR(@FechaConsulta) 
			AND Mes = MONTH(@FechaConsulta)
	) EP ON EP.Id = CF.IdEmpresa
	WHERE CF.Fecha = @FechaConsulta AND CF.N1 = @UN1 AND CF.N2 = 0 AND CF.N3 = 0
	GROUP BY CF.IdEmpresa ,CF.IdLinea ,CF.IdCentro ,EP.Porcentaje
END

```
