# Stored Procedure: sp_CF_AnticiposEmpleados

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[v_CF_AgrupacionLinea]]
- [[v_HojasDeGastosPendientes]]
- [[v_Requisiciones_EmpleadosActivosRetirados]]

```sql

CREATE PROC [dbo].[sp_CF_AnticiposEmpleados] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF
	
	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Anticipos Empleados';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)

	SELECT	Fecha=@FechaIngreso,		IdEmpresa,			IdLinea,		
			IdCentro,					N1 = @N1,			N2 = @N2,
			N3 = @N3,					Valor=SUM(Valor)
	FROM (
		SELECT	IdEmpresa = B.CodigoEmpresa,					IdCentro = ISNULL(B.codigo_centro,0), 
				Valor = ISNULL(A.ImporteTotalFactura,0),
				IdLinea = CASE WHEN B.codigo_seccion = 1297 THEN 'JD' 
						WHEN B.codigo_seccion = 1306 THEN 'MAY MIT'
						WHEN B.codigo_seccion = 1307 THEN 'MAY BYD'			
						ELSE ISNULL(C.Id_Linea,'SIN_L') END 
		FROM V_HojasDeGastosPendientes A WITH(NOLOCK)
		LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados B WITH(NOLOCK) ON A.NifCif = B.CodigoEmpleado
		LEFT JOIN (
			SELECT DISTINCT Id_Linea, Id_Seccion FROM v_CF_AgrupacionLinea 
		) C ON C.Id_Seccion  = B.codigo_seccion
			WHERE A.Ano_Periodo = YEAR(@FechaConsulta) AND A.Mes_Periodo = MONTH(@FechaConsulta) 
				AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
	) A
	GROUP BY IdEmpresa, IdLinea, IdCentro
END 

```
