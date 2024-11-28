# Table: Requisiciones_Entrevista

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdEntrevista | bigint | NO |
| IdSolicitud | int | YES |
| CodMunicipio | smallint | YES |
| Municipio | nvarchar | YES |
| CodCiudad | bigint | YES |
| Ciudad | nvarchar | YES |
| FechaEntrevista | datetime | YES |
| CedulaCandidato | bigint | YES |
| Edad | nvarchar | YES |
| Sexo | nvarchar | YES |
| EstadoCivil | nvarchar | YES |
| TipoVivienda | nvarchar | YES |
| CodCiudadCandidato | bigint | YES |
| CiudadCandidato | nvarchar | YES |
| BarrioCandidato | nvarchar | YES |
| NucleoFamiliar | nvarchar | YES |
| TieneProcesoActivo | bit | YES |
| CandidatoProcesoActivo | nvarchar | YES |
| Primaria | bit | YES |
| Bachillerato | bit | YES |
| Tecnico | bit | YES |
| Tecnologo | bit | YES |
| Profesional | bit | YES |
| Postgrado | bit | YES |
| CuentaConCertificado | bit | YES |
| FortalezasCargo | nvarchar | YES |
| HabilidadesCargo | nvarchar | YES |
| ComentariosAdicionales | nvarchar | YES |
| Recomendaciones | nvarchar | YES |
| Observaciones | nvarchar | YES |
| PrimerEmpleo | bit | NO |
| CabezaFamilia | bit | NO |
| FechaPreEntrevista | datetime | YES |
