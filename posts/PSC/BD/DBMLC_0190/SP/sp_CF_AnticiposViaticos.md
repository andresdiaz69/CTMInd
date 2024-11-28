# Stored Procedure: sp_CF_AnticiposViaticos

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[EmpleadosActivos]]
- [[spiga_ContabilidadMovimientos]]
- [[spiga_Terceros]]
- [[v_CF_AgrupacionLinea]]
- [[v_Requisiciones_EmpleadosActivosRetirados]]

```sql

CREATE PROC [dbo].[sp_CF_AnticiposViaticos] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
)
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF
	
	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Anticipos Viaticos';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)

	SELECT	 Fecha = @FechaIngreso		,A.IdEmpresa							,IdLinea = ISNULL(B.Id_Linea,'SIN_L')
			,IdCentro					,N1 = @N1								,N2 = @N2
			,N3 = @N3					,Valor = SUM(Debe) - SUM(Haber)
	FROM 
	(
		SELECT	 IdEmpresa = CASE WHEN B.NifCif = '1001217297' THEN E.CodigoEmpresa ELSE C.CodigoEmpresa END
				,IdCentro = CASE WHEN B.NifCif = '1001217297' THEN E.codigo_centro ELSE C.codigo_centro END 
				,Unidad_Negocio = CASE WHEN B.NifCif = '1001217297' THEN E.Unidad_Negocio ELSE C.Unidad_Negocio END
				,Debe				,Haber
		FROM 
		(
			SELECT	IdEmpresas		,Debe=ISNULL(Debe,0)		,Haber=ISNULL(Haber,0)		,Centro
				,CodigoTercero=CASE WHEN CodigoTercero IN (78545,2044,45426,71756,72325,80112) THEN CONCAT(CodigoTercero,0)
									WHEN CodigoTercero = 21085 THEN 422174 ELSE CodigoTercero END 	
			FROM [PSCService_DB].[dbo].[spiga_ContabilidadMovimientos] WITH(NOLOCK)
			WHERE Ano_Periodo = YEAR(@FechaConsulta) AND MONTH(FechaAsiento) <= MONTH(@FechaConsulta)
				AND Cuenta = '1330151115' AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
				--AND concepto NOT LIKE '%Apertura Ejercicio%' AND concepto NOT LIKE '%Ajuste automático%' 
				--AND concepto NOT LIKE '%Cierre Ejercicio%'
		)A
		LEFT JOIN [PSCService_DB].[dbo].[spiga_Terceros] B WITH(NOLOCK) ON A.CodigoTercero = B.PKTERCEROS
		LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados C WITH(NOLOCK) ON B.NifCif = C.CodigoEmpleado
		LEFT JOIN (
			SELECT CodigoEmpleado ,CodigoEmpresa ,codigo_centro ,Unidad_Negocio ,Fecha=MAX(CONCAT(Ano_Periodo,'-',Mes_Periodo)) 
			FROM EmpleadosActivos 
			WHERE CodigoEmpleado IN ('1001217297') 
			GROUP BY CodigoEmpleado ,CodigoEmpresa ,codigo_centro ,Unidad_Negocio
		) E ON B.NifCif = E.CodigoEmpleado
	)A
	LEFT JOIN (
		SELECT DISTINCT Id_Linea, Cod_Linea FROM v_CF_AgrupacionLinea
	) B ON B.Cod_Linea = A.Unidad_Negocio
	GROUP BY A.IdEmpresa ,B.Id_Linea ,A.IdCentro
END

```
