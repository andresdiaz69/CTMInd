# Stored Procedure: sp_ClubIntegralComercialCreditosCentrosFinal

## Usa los objetos:
- [[vw_ClubIntegralComercialF_I_Detalles_Final]]

```sql


CREATE PROCEDURE [dbo].[sp_ClubIntegralComercialCreditosCentrosFinal]

AS BEGIN
IF OBJECT_ID (N'dbo.ClubIntegralComercialAC_Creditos_Detalles_Final', N'U') IS NOT NULL
		DROP TABLE dbo.ClubIntegralComercialAC_Creditos_Detalles_Final

DECLARE @cols NVARCHAR(MAX),@query NVARCHAR(MAX),@isnull NVARCHAR(MAX),@colsnn NVARCHAR(MAX),@autorizadas NVARCHAR(MAX),@autorizassinsigno NVARCHAR(MAX)
,@No_autorizadas NVARCHAR(MAX),@TotalCreditos NVARCHAR(MAX),@TotalCreditosSinsigno NVARCHAR(MAX),@Penetracion NVARCHAR(MAX) ,@Participacion NVARCHAR(MAX) 
,@ParticipacionOtrasFin NVARCHAR(MAX)


SET @cols = STUFF(

    ( SELECT 
         ','+QUOTENAME((c.NombreFinanciera))
        FROM vw_ClubIntegralComercialF_I_Detalles_Final c 
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');
		
SET @isnull = STUFF(

    ( SELECT 
         ', isnull('+QUOTENAME((c.NombreFinanciera))+',0)'+QUOTENAME((c.NombreFinanciera))
        FROM vw_ClubIntegralComercialF_I_Detalles_Final c 
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');


SET @colsnn = STUFF(

    ( SELECT 
         ', sum('+QUOTENAME((c.NombreFinanciera))+')'+QUOTENAME((c.NombreFinanciera))
        FROM vw_ClubIntegralComercialF_I_Detalles_Final c 
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');

SET @autorizadas = STUFF(

    ( SELECT 
			''+QUOTENAME((c.NombreFinanciera))+'+'
        FROM vw_ClubIntegralComercialF_I_Detalles_Final c 
		WHERE c.NombreFinanciera <> 'NO_AUTORIZADAS'
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');


SET @No_autorizadas = STUFF(

    ( SELECT 
			',sum('+QUOTENAME((c.NombreFinanciera))+')'
        FROM vw_ClubIntegralComercialF_I_Detalles_Final c 
		WHERE c.NombreFinanciera = 'NO_AUTORIZADAS'
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(MAX)'), 1, 1, '');

SET @TotalCreditos = STUFF(

    ( SELECT 
			''+QUOTENAME((c.NombreFinanciera))+'+'
        FROM vw_ClubIntegralComercialF_I_Detalles_Final c 
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(MAX)'), 1, 1, '');


SET @autorizassinsigno = 'sum(['+SUBSTRING(@autorizadas,1,LEN(@autorizadas)-1)+') AUTORIZADAS'

SET @TotalCreditosSinsigno = 'sum(['+SUBSTRING(@TotalCreditos,1,LEN(@TotalCreditos)-1)+') TotalCreditos'



SET @query = '				
					SELECT Ano_Periodo,(CedulaEmpleado)  CodigoEmpleado,(Empleado)Nombres,(IdCentros)CodigoCentro,(Centro)NombreCentro,CodigoMarcaGrupo,Trimestre,(VehiculosVendidos)VehiculosRecaudados
					,'+@colsnn+','+@autorizassinsigno+','+@TotalCreditosSinsigno+'
					INTO ClubIntegralComercialAC_Creditos_Detalles_Final
					FROM 
					(
					SELECT  Ano_Periodo,CedulaEmpleado,Empleado,IdCentros,Centro,CodigoMarcaGrupo,Trimestre
					,VehiculosVendidos
					,'+@isnull+'
					
					FROM 
					(	
						SELECT f.Ano_Periodo,f.CedulaEmpleado,f.Empleado,f.Cantidad,f.IdCentros,f.Centro,f.CodigoMarcaGrupo,f.NitFinanciera,f.NombreFinanciera,f.Trimestre,eje.Nombres
						,c.VehiculosVendidos
						FROM vw_ClubIntegralComercialF_I_Detalles_Final f
						left join vw_ClubIntegralComercialEntregas_Centro c on f.IdCentros = c.CodigoCentro and f.Ano_Periodo = c.Ano_Periodo and f.Trimestre = c.Trimestre
						left join vw_ClubIntegralComercialF_I_Ejecutivos eje on f.IdCentros = eje.CodigoCentro

						
					)A
					pivot(sum(cantidad) for NombreFinanciera in ('+@cols+')) p
					)b
					GROUP BY Ano_Periodo,CedulaEmpleado,Empleado,IdCentros,Centro,CodigoMarcaGrupo,Trimestre,VehiculosVendidos
					
				'

EXECUTE(@query)

END

```
