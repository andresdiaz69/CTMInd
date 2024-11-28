# Stored Procedure: ActualizaEmpresasCentrosSeccionesTaller

## Usa los objetos:
- [[spiga_EmpresasCentrosSeccionesTaller]]
- [[spiga_EmpresasCentrosSeccionesTaller]]
- [[spiga_EstructuraDeCostos]]

```sql
create  procedure [dbo].[ActualizaEmpresasCentrosSeccionesTaller] as

begin

begin tran
	begin 
		BEGIN TRY 
			select *
			into #spiga_EmpresasCentrosSeccionesTaller
			from (
					SELECT Cod_Empresa,Cod_Centro,cod_seccion
					FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
					where Cod_Departamento in ('TM','TC')
					and Cod_empresa in (1,5,6,22,24)
					except  
					SELECT  Cod_Empresa,Cod_Centro,cod_seccion
					FROM [PSCService_DB].dbo.spiga_EmpresasCentrosSeccionesTaller
					where Cod_empresa in  (1,5,6,22,24)
			) a

			insert spiga_EmpresasCentrosSeccionesTaller(Cod_Empresa, Nombre_Empresa,Cod_Centro, Nombre_Centro, Cod_seccion,Nombre_seccion)
			select distinct a.Cod_empresa,e.Nombre_Empresa,a.Cod_Centro,e.Nombre_Centro,a.Cod_seccion,e.Nombre_Seccion
			from		#spiga_EmpresasCentrosSeccionesTaller			a
			left join	[PSCService_DB].dbo.spiga_EstructuraDeCostos	e	on	a.Cod_empresa = e.Cod_empresa
																				and a.Cod_Centro = e.Cod_Centro
																				and a.Cod_seccion = e.Cod_seccion
																			
			
	END TRY
	BEGIN CATCH
		BEGIN
			SELECT
	        ERROR_NUMBER() AS ErrorNumber,
	        ERROR_SEVERITY() AS ErrorSeverity,
	        ERROR_STATE() AS ErrorState,
	        ERROR_PROCEDURE() AS ErrorProcedure,
	        ERROR_LINE() AS ErrorLine,
	        ERROR_MESSAGE() AS ErrorMessage,'NO se pudo insertar en la tabla'
			ROLLBACK TRAN
			RETURN
		END
	END CATCH
END

																				
end 
```
