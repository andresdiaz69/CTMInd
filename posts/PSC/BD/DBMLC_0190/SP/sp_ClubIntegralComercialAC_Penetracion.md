# Stored Procedure: sp_ClubIntegralComercialAC_Penetracion

## Usa los objetos:
- [[v_ClubIntegral_Penetracion_Creditos_Asesor]]

```sql



CREATE PROCEDURE [dbo].[sp_ClubIntegralComercialAC_Penetracion] 


AS BEGIN
	IF OBJECT_ID (N'dbo.ClubIntegralComercialAC_Creditos_Detalles', N'U') IS NOT NULL
		DROP TABLE dbo.ClubIntegralComercialAC_Creditos_Detalles

DECLARE @cols NVARCHAR(MAX),@query NVARCHAR(MAX), @colsn NVARCHAR(MAX), @colsnn NVARCHAR(MAX), @autorizadas NVARCHAR(MAX) , @No_autorizadas NVARCHAR(MAX)
 ,@autorizassinsigno NVARCHAR(MAX) , @TotalCreditos NVARCHAR(MAX)
, @TotalCreditosSinsigno NVARCHAR(MAX),@Penetracion NVARCHAR(MAX) ,@Participacion NVARCHAR(MAX) 
,@ParticipacionOtrasFin NVARCHAR(MAX)

SET @cols = STUFF(

    ( SELECT 
         ','+QUOTENAME((c.NombreFinanciera))
        FROM [v_ClubIntegral_Penetracion_Creditos_Asesor] c 
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');

SET @colsn = STUFF(

    ( SELECT 
         ', isnull('+QUOTENAME((c.NombreFinanciera))+',0)'+QUOTENAME((c.NombreFinanciera))
        FROM [v_ClubIntegral_Penetracion_Creditos_Asesor] c 
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');

SET @colsnn = STUFF(

    ( SELECT 
         ', sum('+QUOTENAME((c.NombreFinanciera))+')'+QUOTENAME((c.NombreFinanciera))
        FROM [v_ClubIntegral_Penetracion_Creditos_Asesor] c 
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');

SET @autorizadas = STUFF(

    ( SELECT 
			''+QUOTENAME((c.NombreFinanciera))+'+'
        FROM [v_ClubIntegral_Penetracion_Creditos_Asesor] c 
		WHERE c.NombreFinanciera <> 'NO_AUTORIZADAS'
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');

SET @No_autorizadas = STUFF(

    ( SELECT 
			',sum('+QUOTENAME((c.NombreFinanciera))+')'
        FROM [v_ClubIntegral_Penetracion_Creditos_Asesor] c 
		WHERE c.NombreFinanciera = 'NO_AUTORIZADAS'
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(MAX)'), 1, 1, '');

SET @TotalCreditos = STUFF(

    ( SELECT 
			''+QUOTENAME((c.NombreFinanciera))+'+'
        FROM [v_ClubIntegral_Penetracion_Creditos_Asesor] c 
		GROUP BY c.NombreFinanciera
		ORDER BY c.NombreFinanciera
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(MAX)'), 1, 1, '');


SET @autorizassinsigno = 'sum(['+SUBSTRING(@autorizadas,1,LEN(@autorizadas)-1)+') AUTORIZADAS'

SET @TotalCreditosSinsigno = 'sum(['+SUBSTRING(@TotalCreditos,1,LEN(@TotalCreditos)-1)+') TotalCreditos'

SET @Penetracion = 'Convert(Decimal(18,2),case when (sum(VehiculosRecaudados)) <> 0 then Convert(decimal(18,2),(sum(['+SUBSTRING(@TotalCreditos,1,LEN(@TotalCreditos)-1)+'))) /   (sum(VehiculosRecaudados))*100 else  0 end)PENETRACION'

SET @Participacion = 'Convert(Decimal(18,2),case when Convert(decimal(18,2),(sum(['+SUBSTRING(@TotalCreditos,1,LEN(@TotalCreditos)-1)+'))) <> 0  then  convert(decimal(18,2),(sum(['+SUBSTRING(@autorizadas,1,LEN(@autorizadas)-1)+'))) / convert(decimal(18,2),(sum(['+SUBSTRING(@TotalCreditos,1,LEN(@TotalCreditos)-1)+')))*100 else 0  end)PARTICIPACION'

SET @ParticipacionOtrasFin = 'Convert(Decimal(18,2),case when Convert(decimal(18,2),(sum(['+SUBSTRING(@TotalCreditos,1,LEN(@TotalCreditos)-1)+'))) <> 0  then  convert(decimal(18,2),sum(NO_AUTORIZADAS)) / convert(decimal(18,2),(sum(['+SUBSTRING(@TotalCreditos,1,LEN(@TotalCreditos)-1)+')))*100 else 0  end)PARTICIPACION_OTRAS_FIN'

--print @No_autorizadas

SET @query = '					
			SELECT Ano_Periodo,CedulaVendedor,NombreVendedor,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,Trimestre,sum(VehiculosRecaudados)VehiculosRecaudados
				,'+@colsnn+','+@autorizassinsigno+','+@TotalCreditosSinsigno+'
				,'+@Penetracion+','+@Participacion+'
				,'+@ParticipacionOtrasFin+'
				INTO ClubIntegralComercialAC_Creditos_Detalles		
				FROM
				(	
					SELECT Ano_periodo,CedulaVendedor,NombreVendedor,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,mes_periodo
					,case when mes_periodo = 1 then 3  when mes_periodo = 2 then 3 when mes_periodo = 3 then 3 
						  when mes_periodo = 4 then 4  when mes_periodo = 5 then 4 when mes_periodo = 6 then 4
						  when mes_periodo = 7 then 1  when mes_periodo = 8 then 1 when mes_periodo = 9 then 1
						  when mes_periodo = 10 then 2 when mes_periodo = 11 then 2 when mes_periodo = 12 then 2
					end as Trimestre
					,VehiculosRecaudados,'+@colsn+'

					FROM 
					(	
						SELECT Ano_Periodo,CedulaVendedor,NombreVendedor,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,mes_periodo,VehiculosRecaudados,Cantidad,NombreFinanciera
						FROM v_ClubIntegral_Penetracion_Creditos_Asesor
					)A
					pivot(sum(cantidad) for NombreFinanciera in ('+@cols+')) p
					
				)B
				group by  Ano_Periodo,CedulaVendedor,NombreVendedor,CodigoMarcaCI,MarcaCI,Trimestre,CodigoCentro,NombreCentro
		'

EXECUTE(@query)

END

```
