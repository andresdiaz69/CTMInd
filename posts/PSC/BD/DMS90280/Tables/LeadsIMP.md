# Table: LeadsIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkLeadsIMP | bigint | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkMarcas | smallint | NO |
| Lead | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaProceso | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkProcesos | int | YES |
| Observaciones | nvarchar | YES |
| LeadVersion | nvarchar | YES |
