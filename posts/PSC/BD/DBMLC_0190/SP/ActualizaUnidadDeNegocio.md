# Stored Procedure: ActualizaUnidadDeNegocio

## Usa los objetos:
- [[spiga_EstructuraDeCostos]]
- [[UnidadDeNegocio]]

```sql
CREATE  procedure ActualizaUnidadDeNegocio as

begin

begin tran
	begin 
		BEGIN TRY 
			select *
			into #TablaUnidadDeNegocio
			from (
				SELECT Cod_Empresa,Cod_Centro,cod_seccion,Cod_Departamento
				FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
				where Cod_empresa in (1,5,6,22,24) and cod_seccion is not null
				except  
				SELECT CodEmpresa,CodCentro,codseccion,CodDepartamento
				FROM UnidadDeNegocio
				where Codempresa in  (1,5,6,22,24)
			) a


			insert UnidadDeNegocio(CodEmpresa, CodCentro, NombreCentro, CodSeccion, NombreSeccion, CodDepartamento, NombreDepartamento, CodUnidadNegocio, 
			NombreUnidadNegocio, Sigla, Division, CodSedeAmbiental, SedeAmbiental, CodSedeDistCol, SedeDistribucionColision, UnidadNegocio_Requisicion, 
			NombreUnidadNegocio_Requisicion)
			select distinct a.Cod_empresa,a.Cod_Centro,e.Nombre_Centro,a.Cod_seccion,e.Nombre_Seccion,a.Cod_Departamento,e.Nombre_Departamento,
			u.CodUnidadNegocio,u.NombreUnidadNegocio,u.Sigla,u.Division,u.CodSedeAmbiental,u.SedeAmbiental,
			CodSedeDistCol,SedeDistribucionColision,u.UnidadNegocio_Requisicion,u.NombreUnidadNegocio_Requisicion
			from		#TablaUnidadDeNegocio							a
			left join	[PSCService_DB].dbo.spiga_EstructuraDeCostos	e	on	a.Cod_empresa = e.Cod_empresa
																				and a.Cod_Centro = e.Cod_Centro
																				and a.Cod_seccion = e.Cod_seccion
																				and a.Cod_Departamento = e.Cod_Departamento
			left join	UnidadDeNegocio									u	on	a.Cod_empresa = u.CodEmpresa
																				and a.Cod_Centro = u.CodCentro

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
