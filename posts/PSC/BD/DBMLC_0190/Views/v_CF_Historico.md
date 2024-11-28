# View: v_CF_Historico

## Usa los objetos:
- [[AspNetUsers]]
- [[CF_Historico]]
- [[Profiles]]

```sql
CREATE VIEW [dbo].[v_CF_Historico] AS
SELECT	 Año				,Mes			,Id					,Nombre			,Valor 				,PorcentajeEmpresa	
		,ValorLinea			,Tipo			,Observaciones		,IdHistorico 	,DetalleHistorico	,FechaModificacion		
		,UserId				,Email			,Cedula				,NombreUsuario
FROM 
(
	SELECT	 IdHistorico							,DetalleHistorico										,FechaModificacion
			,UserId									,Email													,Cedula
			,NombreUsuario							,Tipo													,Año = CONVERT(INT, Año)
			,Mes = CONVERT(INT, Mes)				,Valor													,Observaciones
			,Id	= CONVERT(NVARCHAR(15), Id)			,Nombre = UPPER(CONVERT(NVARCHAR(100), Nombre))		
			,ValorLinea = CASE WHEN Tipo = 'DirPM' THEN CONVERT(BIGINT, Valor) ELSE 0 END
			,PorcentajeEmpresa = CASE WHEN Tipo = 'TasaCFC' THEN CONVERT(DECIMAL(6,2), REPLACE(Valor, ',', '.')) ELSE 0 END
	FROM (
		SELECT	 IdHistorico	,Detalle AS DetalleHistorico		,FechaModificacion		,UserId				,Email
			,Cedula				,Nombres							,Apellidos				,NombreUsuario		,Tipo
			
			,Año = CASE WHEN CHARINDEX('año:', Detalle) > 0 AND CHARINDEX(', mes:', Detalle) > 0 
						THEN SUBSTRING(
							Detalle, 
							CHARINDEX('año:', Detalle) + LEN('año:'), 
							CHARINDEX(', mes:', Detalle) - (CHARINDEX('año:', Detalle) + LEN('año:') - 1) - 1
						) 
						ELSE NULL 
					END

			,Mes = CASE WHEN CHARINDEX('mes:', Detalle) > 0 AND CHARINDEX(', id:', Detalle) > 0 
						THEN SUBSTRING(
							Detalle, 
							CHARINDEX('mes:', Detalle) + LEN('mes:'), 
							CHARINDEX(', id:', Detalle) - (CHARINDEX('mes:', Detalle) + LEN('mes:') - 1) - 1
						) 
						ELSE NULL 
					END 

			,Id = CASE WHEN CHARINDEX('id:', Detalle) > 0 AND CHARINDEX(', nombre:', Detalle) > 0 
						THEN SUBSTRING(
							Detalle, 
							CHARINDEX('id:', Detalle) + LEN('id:'), 
							CHARINDEX(', nombre:', Detalle) - (CHARINDEX('id:', Detalle) + LEN('id:') - 1) - 1
						) 
						ELSE NULL 
					END

			,Nombre = CASE WHEN CHARINDEX('nombre:', Detalle) > 0 
							AND CHARINDEX(', ' + CASE WHEN Tipo = 'TasaCFC' THEN 'porcentaje' ELSE 'valor' END + ':', Detalle) > 0 
						THEN SUBSTRING(
							Detalle, 
							CHARINDEX('nombre:', Detalle) + LEN('nombre:'), 
							CHARINDEX(', ' + CASE WHEN Tipo = 'TasaCFC' THEN 'porcentaje' ELSE 'valor' END + ':', Detalle) 
							- (CHARINDEX('nombre:', Detalle) + LEN('nombre:') - 1) - 1
						) 
						ELSE NULL 
					END

			,Valor = CASE 
					WHEN Tipo = 'TasaCFC' 
						AND CHARINDEX('porcentaje:', Detalle) > 0 
						AND CHARINDEX('..', Detalle) > 0 
					THEN SUBSTRING(
						Detalle, 
						CHARINDEX('porcentaje:', Detalle) + LEN('porcentaje:'), 
						CHARINDEX('..', Detalle) - (CHARINDEX('porcentaje:', Detalle) + LEN('porcentaje:') - 1) - 1
					) 
					WHEN Tipo != 'TasaCFC' 
						AND CHARINDEX('valor:', Detalle) > 0 
						AND CHARINDEX('..', Detalle) > 0 
					THEN SUBSTRING(
						Detalle, 
						CHARINDEX('valor:', Detalle) + LEN('valor:'), 
						CHARINDEX('..', Detalle) - (CHARINDEX('valor:', Detalle) + LEN('valor:') - 1) - 1
					) 
					ELSE NULL 
				END

			,Observaciones = CASE WHEN Detalle LIKE '%Actualización automatica%' 
									THEN 'Sin modificaciones en el mes.'
									ELSE 'Actualización manual.' END
		FROM
		(
			SELECT	 CF_H.IdHistorico		,CF_H.Detalle				,CF_H.Fecha AS FechaModificacion		
					,CF_H.UserId			,U.Email					,U.UserName AS Cedula		
					,P.Nombres				,P.Apellidos
					,NombreUsuario = UPPER(REPLACE(REPLACE(REPLACE(P.Nombres+' '+P.Apellidos,' ','<>'),'><',''),'<>',' '))
					,Tipo = CASE WHEN SUBSTRING(CF_H.Detalle ,1 ,5) IN ('TasaC','DirPM') 
								THEN SUBSTRING(Detalle ,1 ,CHARINDEX(': ', Detalle) - 1) 
								ELSE '' END
			FROM CF_Historico CF_H
			LEFT JOIN AspNetUsers U ON CF_H.UserId = U.Id
			LEFT JOIN Profiles AS P ON CF_H.UserId = P.UserId
		) A
		WHERE Tipo IN ('TasaCFC','DirPM') 
	) A
)A

```
