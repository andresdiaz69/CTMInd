# Stored Procedure: sp_CF_TallerMecanica

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[spiga_OrdenesDeTrabajoAbiertas]]
- [[spiga_OrdenesDeTrabajoCerradas]]
- [[v_CF_AgrupacionLinea]]

```sql

CREATE PROC [dbo].[sp_CF_TallerMecanica] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Mecanica';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	
	SELECT	Fecha = @FechaIngreso,		IdEmpresa,							IdLinea,
			IdCentro,					N1 = @N1,							N2 = @N2,
			N3 = @N3,					Valor = SUM(CosteRep + CosteSub)
	FROM
	(
		SELECT	IdEmpresa = A.IdEmpresas,					IdCentro = ISNULL(A.IdCentros,0),	
				CosteRep = ISNULL(PrecioMedio,0),			CosteSub = ISNULL(CosteEntradasTrabajosExternos,0),
				IdLinea = CASE WHEN A.IdSecciones = 1297 THEN 'JD' 
								WHEN A.IdSecciones = 1306 THEN 'MAY MIT'
								WHEN A.IdSecciones = 1307 THEN 'MAY BYD'
								ELSE ISNULL(B.Id_Linea,'SIN_L') END
		FROM [PSCService_DB].[dbo].[spiga_OrdenesDeTrabajoCerradas] AS A WITH(NOLOCK)
		LEFT JOIN (
			SELECT DISTINCT Id_Centro, Id_Seccion, Id_Linea, CodDepartamento FROM v_CF_AgrupacionLinea
		) B ON A.IdCentros = B.Id_Centro AND A.IdSecciones = B.Id_Seccion
		WHERE  Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta)
			AND B.CodDepartamento = 'TM' AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)

		UNION ALL

		SELECT	IdEmpresa = A.IdEmpresas,					IdCentro = ISNULL(A.IdCentros,0),	
				CosteRep = ISNULL(PrecioMedio,0),			CosteSub = ISNULL(CosteEntradasTrabajosExternos,0),
				IdLinea = CASE WHEN A.IdSecciones = 1297 THEN 'JD' 
								WHEN A.IdSecciones = 1306 THEN 'MAY MIT'
								WHEN A.IdSecciones = 1307 THEN 'MAY BYD'
								ELSE ISNULL(B.Id_Linea,'SIN_L') END
		FROM [PSCService_DB].[dbo].[spiga_OrdenesDeTrabajoAbiertas] AS A WITH(NOLOCK)
		LEFT JOIN (
			SELECT DISTINCT Id_Centro, Id_Seccion, Id_Linea, CodDepartamento FROM v_CF_AgrupacionLinea
		) B ON A.IdCentros = B.Id_Centro AND A.IdSecciones = B.Id_Seccion
		WHERE Ano_Periodo = YEAR(@FechaConsulta) and Mes_Periodo = MONTH(@FechaConsulta)
			AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27) AND B.CodDepartamento = 'TM'  
	)A	
	GROUP BY IdEmpresa, IdCentro, IdLinea
END

```
