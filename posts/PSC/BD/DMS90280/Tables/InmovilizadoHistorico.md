# Table: InmovilizadoHistorico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFKEmpresas | smallint | NO |
| PkFkInmovilizado | nvarchar | NO |
| PkInmovilizadoHistorico_iden | smallint | NO |
| FechaAlta | datetime | NO |
| FkEmpleados_Modificacion | smallint | YES |
| NombreEmpleadoModificacion | nvarchar | YES |
| CodigoInterno | nvarchar | YES |
| ImporteInicial | decimal | NO |
| ImporteResidual | decimal | NO |
| AmortizacionAcumulada | decimal | YES |
| FkInmovilizadoTipos | smallint | NO |
| InmovilizadoTiposDescripcion | nvarchar | NO |
| DescripcionFiscalidad | nvarchar | YES |
| FkUbicacionGenerica | nvarchar | YES |
| UbicacionGenericaDescripcion | nvarchar | YES |
| FkEmpleados_Receptor | smallint | YES |
| NombreEmpleadoReceptor | nvarchar | YES |
| PorcAmortizacion | decimal | NO |
| OrigenModificacion | nvarchar | YES |
| CausaModificacion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| IdSecciones | nvarchar | YES |
| IdSeccionesDescripcion | nvarchar | YES |
| FKFiscalidadTipos | tinyint | YES |
