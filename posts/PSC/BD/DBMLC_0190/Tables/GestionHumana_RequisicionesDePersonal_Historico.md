# Table: GestionHumana_RequisicionesDePersonal_Historico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdRequisicionPersonal | int | NO |
| Comentarios | nvarchar | YES |
| IdTipoCargo | smallint | NO |
| Codigo_Cargo | nvarchar | YES |
| CodigoEmpleado | bigint | YES |
| NuevoCargo | nvarchar | YES |
| IdTipoContrato | nvarchar | NO |
| FechaIngreso | datetime | NO |
| Nombres | nvarchar | NO |
| Apellido1 | nvarchar | NO |
| Apellido2 | nvarchar | NO |
| Cedula | bigint | NO |
| CodigoEmpresa | smallint | NO |
| CodigoCentro | smallint | NO |
| CodigoSeccion | smallint | NO |
| CodigoDepartamento | nvarchar | NO |
| CodigoMarca | smallint | NO |
| CodigoUnidadNegocio | smallint | NO |
| Codigo_Cargo_Generico | nvarchar | YES |
| Codigo_Cargo_Junta | nvarchar | YES |
| CodigoSede | smallint | NO |
| Salario | decimal | NO |
| Bono_Alimentacion | decimal | YES |
| Bono_Gasolina | decimal | YES |
| Auxilio_Movilizacion | decimal | YES |
| UserIdCreo | nvarchar | NO |
| FechaCreacion | datetime | NO |
| UserIdModifico | nvarchar | YES |
| FechaModificacion | datetime | YES |
