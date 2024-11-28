# Table: Cargos_Historico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| CodigoCargo | nvarchar | NO |
| NombreCargo | nvarchar | NO |
| Activo | bit | NO |
| Obsoleto | bit | NO |
| AplicaBonificacionTaller | bit | NO |
| CodigoConceptoBonificacionTaller | int | NO |
| AplicaBolsaRepuestos | bit | NO |
| AplicaBolsaEspecialistas | bit | NO |
| AplicaBolsaEspecialistasColision | bit | NO |
| sal_bas | decimal | YES |
| niv_car | nvarchar | YES |
| ValorMaximoBonificacion | decimal | YES |
| UserNameModifico | nvarchar | NO |
| TipoModificacion | nvarchar | NO |
| FechaModificacion | datetime | NO |
