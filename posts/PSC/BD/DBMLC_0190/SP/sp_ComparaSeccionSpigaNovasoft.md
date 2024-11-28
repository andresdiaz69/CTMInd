# Stored Procedure: sp_ComparaSeccionSpigaNovasoft

## Usa los objetos:
- [[Comparativo_SeccionSpigaNovasoft]]
- [[gen_clasif1]]
- [[spiga_EstructuraDeCostos]]

```sql
CREATE PROCEDURE [dbo].[sp_ComparaSeccionSpigaNovasoft] as

BEGIN	
	SET NOCOUNT ON
	
if object_id(N'tempdb.dbo.#seccionSN', N'U') is not null
			drop TABLE #seccionSN 

if object_id(N'tempdb.dbo.#Tempseccion', N'U') is not null
	DROP TABLE #Tempseccion


create table #seccionSN (
			[Cod_Seccion] [bigint] not NULL, 
			[Nombre_Seccion] [nvarchar](100) NULL, 
			
) ON [PRIMARY] 



INSERT #seccionSN(Cod_Seccion,Nombre_Seccion)
SELECT distinct Cod_Seccion=rtrim(ltrim(replace(Cod_seccion,' ',''))),Nombre_Seccion=rtrim(ltrim(replace(Nombre_Seccion,' ','')))
--into #temporal
FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
where Cod_empresa in (1,5,6,22,24,27) and Cod_seccion is not null and cod_seccion not in (625,650,656,719,839,840,906,960,961)
except --13 
SELECT Cod_Seccion=rtrim(ltrim(replace(codigo,' ',''))),
Nombre_Seccion=  rtrim(ltrim(replace(replace(replace(replace(replace(replace(replace(nombre,'BE ',''),'IR ',''),'FM ',''),'BP ',''),'MM ',''),'CT ',''),' ','')))
FROM [Novasoft_CT_MM].dbo.gen_clasif1 --175 
where codigo <> 0 and codigo not in (625,650,656,719,839,840,906,960,961)


SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY Cod_Seccion_Spiga)) AS INT),0) AS IdTable, Cod_Seccion_Spiga, Nombre_Seccion_Spiga,
	Cod_Seccion_Novasoft, Nombre_Seccion_Novasoft, Nombre_SeccionSpigaInicio, Nombre_SeccionSpigaFinal, NombreSeccionNominaInicio,
	NombreSeccionNominaFinal

INTO #Tempseccion

FROM 
(
	select distinct Cod_Seccion_Spiga=e.Cod_seccion,Nombre_Seccion_Spiga=e.Nombre_Seccion,
	Cod_Seccion_Novasoft=c.codigo,Nombre_Seccion_Novasoft=c.nombre,
	Nombre_SeccionSpigaInicio=substring(rtrim(ltrim(replace(e.Nombre_Seccion,' ',''))),1,10),
	Nombre_SeccionSpigaFinal=right(rtrim(ltrim(replace(e.Nombre_Seccion,' ',''))),6),
	NombreSeccionNominaInicio=substring(rtrim(ltrim(replace(replace(replace(replace(replace(replace(replace
						(nombre,'BE ',''),'IR ',''),'FM ',''),'BP ',''),'MM ',''),'CT ',''),' ',''))),1,10),
	NombreSeccionNominaFinal=right(rtrim(ltrim(replace(replace(replace(replace(replace(replace(replace
						(nombre,'BE ',''),'IR ',''),'FM ',''),'BP ',''),'MM ',''),'CT ',''),' ',''))),6)
	from #seccionSN											t	
	left join [PSCService_DB].dbo.spiga_EstructuraDeCostos	e	on	t.Cod_seccion = e.Cod_seccion
	left join [Novasoft_CT_MM].dbo.gen_clasif1				c	on	t.Cod_seccion = c.codigo
	where ((substring(rtrim(ltrim(replace(e.Nombre_Seccion,' ',''))),1,10) <> 
	substring(rtrim(ltrim(replace(replace(replace(replace(replace(replace(replace
						(nombre,'BE ',''),'IR ',''),'FM ',''),'BP ',''),'MM ',''),'CT ',''),' ',''))),1,10)
	or right(rtrim(ltrim(replace(e.Nombre_Seccion,' ',''))),6) <>
	right(rtrim(ltrim(replace(replace(replace(replace(replace(replace(replace
	(nombre,'BE ',''),'IR ',''),'FM ',''),'BP ',''),'MM ',''),'CT ',''),' ',''))),6))
	or codigo is null)
) A

IF OBJECT_ID (N'dbo.Comparativo_SeccionSpigaNovasoft', N'U') IS NOT NULL
	BEGIN
		TRUNCATE TABLE dbo.Comparativo_SeccionSpigaNovasoft
		INSERT INTO dbo.Comparativo_SeccionSpigaNovasoft SELECT * FROM #Tempseccion
	END	

ELSE
	BEGIN
		SELECT * INTO dbo.Comparativo_SeccionSpigaNovasoft from #Tempseccion
	END

if object_id(N'tempdb.dbo.#seccionSN', N'U') is not null
			drop TABLE #seccionSN 

if object_id(N'tempdb.dbo.#Tempseccion', N'U') is not null
	DROP TABLE #Tempseccion

END 

```
