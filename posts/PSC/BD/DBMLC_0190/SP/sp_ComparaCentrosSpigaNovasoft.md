# Stored Procedure: sp_ComparaCentrosSpigaNovasoft

## Usa los objetos:
- [[Comparativo_CentroSpigaNovasoft]]
- [[gen_ccosto]]
- [[spiga_EstructuraDeCostos]]

```sql
CREATE PROCEDURE [dbo].[sp_ComparaCentrosSpigaNovasoft] as

BEGIN	
	SET NOCOUNT ON


	
if object_id(N'tempdb.dbo.#centrosSN', N'U') is not null
			drop TABLE #centrosSN 

if object_id(N'tempdb.dbo.#Tmpcentros', N'U') is not null
			drop TABLE #Tmpcentros


create table #centrosSN (
			[Cod_Centro] [bigint] not NULL, 
			[Nombre_Centro] [nvarchar](100) NULL, 
			
) ON [PRIMARY] 



INSERT #centrosSN(Cod_Centro,Nombre_Centro)
SELECT distinct Cod_Centro=rtrim(ltrim(replace(Cod_Centro,' ',''))),Nombre_Centro=rtrim(ltrim(replace(Nombre_Centro,' ','')))
--into #centrosSN
FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
where Cod_empresa in (1,5,6,22,24,27)  --165
except --13 
SELECT Cod_Centro=rtrim(ltrim(replace(cod_cco,' ',''))),Nombre_Centro=rtrim(ltrim(replace(nom_cco,' ','')))
FROM [Novasoft_CT_MM].dbo.gen_ccosto --175 


SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY Cod_Centro_Spiga)) AS INT),0) AS IdTable,
	Cod_Centro_Spiga,Nombre_Centro_Spiga,Cod_Centro_Novasoft,Nombre_Centro_Novasoft

INTO #Tmpcentros

FROM 
(
	select distinct Cod_Centro_Spiga=e.Cod_Centro,Nombre_Centro_Spiga=e.Nombre_Centro,
	Cod_Centro_Novasoft=c.cod_cco,Nombre_Centro_Novasoft=c.nom_cco
	from #centrosSN										t	
	left join [PSCService_DB].dbo.spiga_EstructuraDeCostos	e	on	t.Cod_Centro = e.Cod_Centro
	left join [Novasoft_CT_MM].dbo.gen_ccosto				c	on	t.Cod_centro = c.cod_cco
)A

IF OBJECT_ID (N'dbo.Comparativo_CentroSpigaNovasoft', N'U') IS NOT NULL
	BEGIN
		TRUNCATE TABLE dbo.Comparativo_CentroSpigaNovasoft
		INSERT INTO dbo.Comparativo_CentroSpigaNovasoft SELECT * FROM #Tmpcentros
	END	

ELSE
	BEGIN
		SELECT * INTO dbo.Comparativo_CentroSpigaNovasoft from #Tmpcentros
	END


	
if object_id(N'tempdb.dbo.#centrosSN', N'U') is not null
			drop TABLE #centrosSN 

if object_id(N'tempdb.dbo.#Tmpcentros', N'U') is not null
			drop TABLE #Tmpcentros

END

```
