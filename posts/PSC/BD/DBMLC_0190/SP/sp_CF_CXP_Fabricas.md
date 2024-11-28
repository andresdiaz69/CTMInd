# Stored Procedure: sp_CF_CXP_Fabricas

## Usa los objetos:
- [[CF_CXP]]
- [[CF_Datos]]
- [[CF_Tipos]]

```sql

CREATE PROC [dbo].[sp_CF_CXP_Fabricas] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN

	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Fabricas';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);	

	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	SELECT	Fecha = @FechaIngreso,			IdEmpresa,				IdLinea = ISNULL(IdLinea,'SIN_L'),
		IdCentro=ISNULL(CodCentro,0),		N1 = @N1,				N2 = @N2,
		N3 = @N3,							Valor = SUM(Valor)
	FROM CF_CXP 
	WHERE Ano_Periodo = YEAR(@FechaConsulta) 
		AND Mes_Periodo = MONTH(@FechaConsulta)
		AND Tipo = @Tipo
	GROUP BY IdEmpresa, IdLinea, CodCentro

END

```
