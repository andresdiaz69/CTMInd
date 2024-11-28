# Stored Procedure: sp_CuadroDePersonal_JuntaDirectivaMM

## Usa los objetos:
- [[EmpleadosActivos]]

```sql

CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_JuntaDirectivaMM]
	-- Add the parameters for the stored procedure here
	@AnoActual as int,
	@MesActual as int 
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
SET NOCOUNT ON;

DECLARE @cols NVARCHAR(MAX), @query NVARCHAR(MAX),@colsum NVARCHAR(MAX),@colc NVARCHAR(MAX),@MesAnterior as int,@AnoAnterior NVARCHAR(MAX)
DECLARE @date date= '01-'+cast(@MesActual as char(2))+'-'+cast(@AnoActual as char(4))+'';  
set @MesAnterior = MONTH(dateadd(month, -1,@date))


IF OBJECT_ID('tempdb..#JuntaMM') IS NOT NULL
    DROP TABLE #JuntaMM

create table #JuntaMM (Marca varchar(50))

insert into #JuntaMM 
SELECT rtrim(Marca)+'Actual' as Columna
FROM [EmpleadosActivos]
WHERE CodigoEmpresa = 6 and Mes_Periodo in (@MesActual)  
GROUP BY Marca,Mes_Periodo

union
			 
SELECT rtrim(Marca)+'Anterior' as Columna
FROM [EmpleadosActivos]
WHERE CodigoEmpresa = 6 and Mes_Periodo in (@MesAnterior) 
GROUP BY Marca,Mes_Periodo

--select * from #JuntaMM
 -- Insert statements for procedure here
	SET @cols = STUFF(
			(SELECT (',' + QuoteName(rtrim(c.Marca)))
			 FROM #JuntaMM c 
			 ORDER BY c.Marca 
			 FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'');
	set @cols = @cols + ',AñoAnterior'
	SET @colc = STUFF(
			(SELECT (',isnull('+QUOTENAME(rtrim(c.[Marca]))+',0)'+QuoteName(rtrim(c.[Marca])))
			 FROM #JuntaMM c 
			 ORDER BY c.Marca 
			 FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'');
	set @colc = @colc + ',isnull(AñoAnterior,0) AñoAnterior'
	

SET @query = 'SELECT row_number() over( order by Nombre_Cargo_Junta  asc) Orden, Nombre_Cargo_Junta, 
isnull([CENTRO DE COLISIONActual],0) AS [CENTRO DE COLISIONActual], 
isnull([CENTRO DE COLISIONAnterior],0) AS [CENTRO DE COLISIONAnterior], 
isnull([CENTRO DIGITALActual],0) as [CENTRO DIGITALActual],
isnull([CENTRO DIGITALAnterior],0) as [CENTRO DIGITALAnterior],
isnull([DAIMLER PC (Vehiculos Pasajeros)Actual],0) as [DAIMLER PC (Vehiculos Pasajeros)Actual],
isnull([DAIMLER PC (Vehiculos Pasajeros)Anterior],0) as [DAIMLER PC (Vehiculos Pasajeros)Anterior],
isnull([DAIMLER VC (Vehiculos Comerciales)Actual],0) as [DAIMLER VC (Vehiculos Comerciales)Actual],
isnull([DAIMLER VC (Vehiculos Comerciales)Anterior],0) as [DAIMLER VC (Vehiculos Comerciales)Anterior],
isnull([MMC - MITSUBISHIActual],0) as [MMC - MITSUBISHIActual],
isnull([MMC - MITSUBISHIAnterior],0) as [MMC - MITSUBISHIAnterior],
isnull([USC (Unidad de Servicios Compartidos)Actual],0) as [USC (Unidad de Servicios Compartidos)Actual],
isnull([USC (Unidad de Servicios Compartidos)Anterior],0) as [USC (Unidad de Servicios Compartidos)Anterior],
isnull([AñoAnterior],0) as [AñoAnterior] from (

SELECT [Nombre_Cargo_Junta],rtrim(Marca)+(case when Mes_Periodo='+cast(@MesAnterior as char(2))+' then ''Anterior'' else ''Actual'' end ) Marca,Count(*) Cantidad
  FROM [EmpleadosActivos]
  WHERE CodigoEmpresa = 6 AND 
  (
  (Mes_Periodo = '+cast(@MesActual   as char(2))+' AND Ano_Periodo = '+cast(@AnoActual as char(4))+')
  or 
  (Mes_Periodo = '+cast(@MesAnterior as char(2))+' AND Ano_Periodo = '+case when @MesActual=1 then cast(@AnoActual -1 as char(4)) else cast(@AnoActual as char(4)) end+')
  )
  GROUP BY Nombre_Cargo_Junta, Marca,Mes_Periodo
union
SELECT Nombre_Cargo_Junta,''AñoAnterior'' Marca, count(*) Cantidad
	FROM EmpleadosActivos
	WHERE CodigoEmpresa = 6 AND Mes_Periodo = '+cast(@MesActual as char(2))+' AND Ano_Periodo = '+cast(@AnoActual - 1 as char(4))+'
	GROUP BY Nombre_Cargo_Junta


)x pivot (sum(Cantidad) for Marca in ([CENTRO DE COLISIONActual], 
[CENTRO DE COLISIONAnterior],
[CENTRO DIGITALActual],
[CENTRO DIGITALAnterior],
[DAIMLER PC (Vehiculos Pasajeros)Actual],
[DAIMLER PC (Vehiculos Pasajeros)Anterior],
[DAIMLER VC (Vehiculos Comerciales)Actual],
[DAIMLER VC (Vehiculos Comerciales)Anterior],
[MMC - MITSUBISHIActual],
[MMC - MITSUBISHIAnterior],
[USC (Unidad de Servicios Compartidos)Actual],
[USC (Unidad de Servicios Compartidos)Anterior],
[AñoAnterior])) p group by Nombre_Cargo_Junta,[CENTRO DE COLISIONActual],[CENTRO DE COLISIONAnterior],[CENTRO DIGITALActual],[CENTRO DIGITALAnterior],[DAIMLER PC (Vehiculos Pasajeros)Actual],[DAIMLER PC (Vehiculos Pasajeros)Anterior],[DAIMLER VC (Vehiculos Comerciales)Actual],[DAIMLER VC (Vehiculos Comerciales)Anterior],[MMC - MITSUBISHIActual],[MMC - MITSUBISHIAnterior],[USC (Unidad de Servicios Compartidos)Actual],[USC (Unidad de Servicios Compartidos)Anterior],[AñoAnterior]'


exec(@query)


END


```
