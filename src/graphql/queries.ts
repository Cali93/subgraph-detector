// if you use this query you will get more notification updates
// but in the future we might use this one and trigger notifications based on specific conditions
// eg: if the count of currators drops by 1% on a subgraph
export const GET_SUBGRAPHS = `{
  subgraphs {
    id
    nameSignalCount
    nameSignalAmount
    signalledTokens
    unsignalledTokens
    currentSignalledTokens
    nameSignalAmount
    signalAmount
    reserveRatio
    withdrawnTokens
    withdrawableTokens
    owner {
      id
      names {
        id
        name
        nameSystem
        graphAccount {
          id
          defaultName {
            nameSystem
            name
            graphAccount {
              id
              balance
            }
          }
        }
      }
    }
    currentVersion {
      id
      version
      label
      subgraphDeployment {
        id
        originalName
        ipfsHash
        stakedTokens
        createdAt
        deniedAt
      }
    }
    pastVersions {
      id
      version
      label
      subgraphDeployment {
        id
        originalName
        ipfsHash
        stakedTokens
        createdAt
        deniedAt
      }
    }
    versions {
      id
      version
      label
      subgraphDeployment {
        id
        originalName
        ipfsHash
        stakedTokens
        createdAt
        deniedAt
      }
    }
    active
    createdAt
    updatedAt
    codeRepository
  }
}
`;
export const GET_SUBGRAPHS_VERSIONS = `{
  subgraphs {
    id
    owner {
      id
    }
    currentVersion {
      id
      version
      label
      subgraphDeployment {
        id
        originalName
        ipfsHash
        schemaIpfsHash
        createdAt
        deniedAt
      }
    }
    active
    createdAt
    updatedAt
    codeRepository
  }
}
`;