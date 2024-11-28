# Stored Procedure: ActualizaEmpresaCentroDepartamento

## Usa los objetos:
- [[spiga_EmpresaCentroDepartamento]]
- [[spiga_EmpresaCentroDepartamento]]
- [[spiga_EstructuraDeCostos]]

```sql
create  procedure [dbo].[ActualizaEmpresaCentroDepartamento] as

begin

begin tran
	begin 
		BEGIN TRY 
			select *
			into #spiga_EmpresaCentroDepartamento
			from (
					SELECT Cod_Empresa,Cod_Centro,Cod_Departamento,cod_seccion
					FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
					where Cod_Departamento in ('TM','TC')
					and Cod_empresa in (1,5,6,22,24)
					except  
					SELECT  Cod_Empresa,Cod_Centro,Departamento,cod_seccion
					FROM [PSCService_DB].dbo.spiga_EmpresaCentroDepartamento
					where Cod_empresa in  (1,5,6,22,24)
			) a

			insert spiga_EmpresaCentroDepartamento(Cod_Empresa, Nombre_Empresa,Cod_Centro, Nombre_Centro, Departamento,Cod_seccion,Nombre_seccion)
			select distinct a.Cod_empresa,e.Nombre_Empresa,a.Cod_Centro,e.Nombre_Centro,a.Cod_Departamento,a.Cod_seccion,e.Nombre_Seccion
			from		#spiga_EmpresaCentroDepartamento				a
			left join	[PSCService_DB].dbo.spiga_EstructuraDeCostos	e	on	a.Cod_empresa = e.Cod_empresa
																				and a.Cod_Centro = e.Cod_Centro
																				and a.Cod_seccion = e.Cod_seccion
																				and a.Cod_Departamento = e.Cod_Departamento
			
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
